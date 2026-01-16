import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { Member } from 'src/libs/dto/member/member';
import { LoginInput, MemberInput } from 'src/libs/dto/member/member.input';
import { Message } from 'src/libs/enums/common.enum';
import { MemberStatus } from 'src/libs/enums/member.enum';
import { T } from 'src/libs/types/common';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel('Member') private readonly memberModel: Model<Member>,
    private authService: AuthService,
  ) {}

  public async signup(input: MemberInput): Promise<Member> {
    input.memberPassword = await this.authService.hashPassword(
      input.memberPassword,
    );
    try {
      const member = await this.memberModel.create(input);

      // Convert Mongoose document to plain object
      const result = member.toObject();
      //TODO: Authentication with tokens
      result.accessToken = await this.authService.createToken(result);

      return result;
    } catch (err) {
      console.log('Error, signup', err.message);
      throw new BadRequestException(Message.USED_MEMBER_NICK_OR_PHONE);
    }
  }

  public async login(input: LoginInput): Promise<Member> {
    const { memberNick, memberPassword } = input;
    const response: Member = await this.memberModel
      .findOne({ memberNick: memberNick })
      .select('+memberPassword')
      .exec();
    if (!response || response.memberStatus === MemberStatus.DELETE) {
      throw new InternalServerErrorException(Message.NO_MEMBER_NICK);
    } else if (response.memberStatus === MemberStatus.BLOCK) {
      throw new InternalServerErrorException(Message.BLOCKED_USER);
    }

    //TODO: Compare passwords
    const isMatch = await this.authService.comparePassword(
      memberPassword,
      response.memberPassword,
    );

    if (!isMatch)
      throw new InternalServerErrorException(Message.WRONG_PASSWORD);

    response.accessToken = await this.authService.createToken(response);
    return response;
  }

  async findById(targetId: ObjectId): Promise<Member> {
    const search: T = {
      _id: targetId,
      memberStatus: { $in: [MemberStatus.ACTIVE, MemberStatus.BLOCK] },
    };
    const targetMember = await this.memberModel.findOne(search).lean().exec();
    if (!targetMember)
      throw new InternalServerErrorException(Message.NO_DATA_FOUND);
    return targetMember;
  }
}

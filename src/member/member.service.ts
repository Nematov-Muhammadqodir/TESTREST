import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Member } from 'src/libs/dto/member/member';
import { Message } from 'src/libs/enums/common.enum';
import { MemberStatus } from 'src/libs/enums/member.enum';
import { T } from 'src/libs/types/common';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel('Member') private readonly memberModel: Model<Member>,
  ) {}

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

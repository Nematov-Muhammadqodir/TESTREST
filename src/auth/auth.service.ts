import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { shapeIntoMongoObjectId } from 'src/libs/config';
import { Member } from 'src/libs/dto/member/member';

import { T } from 'src/libs/types/common';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  public async hashPassword(memberPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt();

    return await bcrypt.hash(memberPassword, salt);
  }

  public async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  public async createToken(member: Member): Promise<string> {
    const payload: T = {};
    Object.keys(member['_doc'] ? member['_doc'] : member).map((ele) => {
      payload[`${ele}`] = member[`${ele}`];
    });
    delete payload.memberPassword;

    return await this.jwtService.signAsync(payload);
  }

  public async verifyToken(token: string): Promise<Member> {
    const member: Member = await this.jwtService.verifyAsync(token);
    member._id = shapeIntoMongoObjectId(member._id);
    return member;
  }
}

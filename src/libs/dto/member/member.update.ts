import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import {
  MemberAuthType,
  MemberStatus,
  MemberType,
} from '../../enums/member.enum';
import { ObjectId } from 'mongoose';

export class MemberUpdate {
  @IsNotEmpty()
  _id: ObjectId;

  @IsOptional()
  memberType?: MemberType;

  @IsOptional()
  memberStatus?: MemberStatus;

  @IsOptional()
  memberPhone?: string;

  @Length(3, 12)
  @IsOptional()
  memberNick?: string;

  @Length(5, 12)
  @IsOptional()
  memberPassword?: string;

  @IsOptional()
  @Length(3, 100)
  memberFullName?: string;

  @IsOptional()
  memberImage?: string;

  @IsOptional()
  memberAddress?: string;

  @IsOptional()
  memberDesc?: string;

  deletedAt?: Date;
}

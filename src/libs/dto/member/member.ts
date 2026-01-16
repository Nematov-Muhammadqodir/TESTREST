import { ObjectId } from 'mongoose';
import {
  MemberAuthType,
  MemberStatus,
  MemberType,
} from '../../enums/member.enum';

export class Member {
  _id: ObjectId;

  memberType: MemberType;
  memberStatus: MemberStatus;
  memberAuthType: MemberAuthType;

  memberPhone: string;
  memberNick: string;

  // ❌ never expose password in REST response
  memberPassword: string;

  memberFullName?: string;
  memberImage: string;
  memberAddress?: string;
  memberDesc?: string;

  memberProperties: number;
  memberArticles: number;
  memberFollowers: number;
  memberFollowings: number;
  memberPoints: number;
  memberLikes: number;
  memberViews: number;
  memberComments: number;
  memberRank: number;
  memberWarnings: number;
  memberBlocks: number;

  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;

  accessToken?: string;
}

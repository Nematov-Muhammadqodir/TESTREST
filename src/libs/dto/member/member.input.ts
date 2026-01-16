import { IsIn, IsNotEmpty, IsOptional, Length, Min } from 'class-validator';
import {
  MemberAuthType,
  MemberStatus,
  MemberType,
} from '../../enums/member.enum';

import { Direction } from 'src/libs/enums/common.enum';
import { availableAgentSorts, availableMemberSorts } from 'src/libs/config';

export class MemberInput {
  @IsNotEmpty()
  @Length(3, 12)
  memberNick: string;

  @IsNotEmpty()
  @Length(5, 12)
  memberPassword: string;

  @IsNotEmpty()
  memberPhone: string;

  @IsOptional()
  memberType?: MemberType;

  @IsOptional()
  memberAuthType?: MemberAuthType;
}

export class LoginInput {
  @IsNotEmpty()
  @Length(3, 12)
  memberNick: string;

  @IsNotEmpty()
  @Length(5, 12)
  memberPassword: string;
}

class AISearch {
  constructor() {
    console.log('I am here too');
  }
  @IsOptional()
  text?: string;
}

export class AgentsInquiry {
  constructor() {
    console.log('I am here');
  }
  @IsNotEmpty()
  @Min(1)
  page: number;

  @IsNotEmpty()
  @Min(1)
  limit: number;

  @IsOptional()
  @IsIn(availableAgentSorts)
  sort?: string;

  @IsOptional()
  direction?: Direction;

  @IsNotEmpty()
  search: AISearch;
}

class MISearch {
  @IsOptional()
  memberStatus?: MemberStatus;

  @IsOptional()
  memberType?: MemberType;

  @IsOptional()
  text?: string;
}

export class MembersInquiry {
  @IsNotEmpty()
  @Min(1)
  page: number;

  @IsNotEmpty()
  @Min(1)
  limit: number;

  @IsOptional()
  @IsIn(availableMemberSorts)
  sort?: string;

  @IsOptional()
  direction?: Direction;

  @IsNotEmpty()
  search: MISearch;
}

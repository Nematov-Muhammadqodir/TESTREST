import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { Member } from 'src/libs/dto/member/member';
import { LoginInput, MemberInput } from 'src/libs/dto/member/member.input';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AuthMember } from 'src/auth/decorators/authMember.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { MemberType } from 'src/libs/enums/member.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  public async signup(@Body() input: MemberInput): Promise<Member> {
    console.log('Mutation signup');
    console.log('Input', input);
    return await this.memberService.signup(input);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  public async login(@Body() input: LoginInput): Promise<Member> {
    return await this.memberService.login(input);
  }

  @UseGuards(AuthGuard)
  @Get('checkAuth')
  public async checkAuth(
    @AuthMember('memberNick') memberNick: string,
  ): Promise<string> {
    console.log('Query: checkAuth');
    console.log('memberNick:', memberNick);

    return `Hi ${memberNick}`;
  }

  @Roles(MemberType.USER, MemberType.AGENT)
  @UseGuards(RolesGuard)
  @Get('checkAuthRoles')
  public async checkAuthRoles(
    @AuthMember() authMember: Member,
  ): Promise<string> {
    console.log('Query: checkAuthRoles');

    return `Hi ${authMember.memberNick}, you are ${authMember.memberType} (memberId: ${authMember._id})`;
  }
}

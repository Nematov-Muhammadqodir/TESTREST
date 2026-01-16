import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { Member } from 'src/libs/dto/member/member';
import { LoginInput, MemberInput } from 'src/libs/dto/member/member.input';

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
}

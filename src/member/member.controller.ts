import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { Member } from 'src/libs/dto/member/member';
import { MemberInput } from 'src/libs/dto/member/member.input';

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
}

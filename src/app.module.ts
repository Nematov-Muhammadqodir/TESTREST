import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MemberController } from './member/member.controller';
import { MemberService } from './member/member.service';
import { MemberModule } from './member/member.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, MemberModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

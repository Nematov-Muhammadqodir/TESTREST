import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { MongooseModule } from '@nestjs/mongoose';
import MemberSchema from 'src/schemas/Member.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Member', schema: MemberSchema }]),
  ],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'user', method: RequestMethod.GET },
        { path: 'user', method: RequestMethod.PUT },
      );
  }
}

import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { MongooseModule } from '@nestjs/mongoose';
import MemberSchema from 'src/schemas/Member.model';
import { AuthMiddleware } from 'src/libs/middlewares/auth.middleware';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Member', schema: MemberSchema }]), // provides MemberModel
    AuthModule, // provides AuthService
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

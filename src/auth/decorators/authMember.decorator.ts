import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthMember = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    let request: any;
    if (context.getType() === 'http') {
      request = context.switchToHttp().getRequest();
      if (request.body.authMember) {
        request.body.authMember.authorization = request.headers?.authorization;
      }
    } else {
      request = context.getArgByIndex(2).req;
      if (request.member) {
        request.member.authorization = request.headers?.authorization;
      }
    }

    const member = request.member;

    return data ? member?.[data] : member;
  },
);

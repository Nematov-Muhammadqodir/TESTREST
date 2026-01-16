// import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// export const AuthMember = createParamDecorator(
//   (data: string, context: ExecutionContext) => {
//     console.log('Heree');
//     let request: any;
//     if (context.getType() === 'http') {
//       request = context.switchToHttp().getRequest();
//       if (request.body.authMember) {
//         request.body.authMember.authorization = request.headers?.authorization;
//       }
//     } else {
//       request = context.getArgByIndex(2).req;
//       if (request.member) {
//         request.member.authorization = request.headers?.authorization;
//       }
//     }

//     const member = request.member;

//     return data ? member?.[data] : member;
//   },
// );

//The code above is a MIT version

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Member } from 'src/libs/dto/member/member';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  authMember?: Member;
}

export const AuthMember = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    console.log('Heree');
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();

    if (!request.authMember) {
      throw new Error('AuthMember not found on request. Did the guard run?');
    }

    return data ? request.authMember[data] : request.authMember;
  },
);

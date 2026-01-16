import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { SECRET } from '../config';
import { MemberService } from 'src/member/member.service';
import { Member } from '../dto/member/member';

interface AuthenticatedRequest extends Request {
  user?: Member; // or whatever type you want
}
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: MemberService) {}

  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      console.log('I am here');
      const token = (authHeaders as string).split(' ')[1];
      const decoded: any = jwt.verify(token, SECRET);
      const user: Member = await this.userService.findById(decoded.id);

      if (!user) {
        console.log('I am here UNAUTHORIZED');
        throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
      }

      req.user = user;
      next();
    } else {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}

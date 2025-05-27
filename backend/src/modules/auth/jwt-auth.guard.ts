// jwt-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { getEnvValue } from 'src/config/config.service';
import { CreateResponse } from 'src/utils/api-response.util';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException(
        CreateResponse('Token no proporcionado', null, 'UNAUTHORIZED')
      );
    }
    
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: getEnvValue('JWT_SECRET'),
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException(
        CreateResponse('Token inválido', null, 'UNAUTHORIZED')
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
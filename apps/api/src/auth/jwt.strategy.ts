import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwksRsa from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';

export type JwtUser = {
  sub: string;
  email?: string;
  name?: string;
  permissions?: string[];
  [key: string]: unknown;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const issuerRaw = configService.get<string>('AUTH0_ISSUER_URL');
    const audience = configService.get<string>('AUTH0_AUDIENCE');

    if (!issuerRaw || !audience) {
      throw new Error(
        'Missing AUTH0_ISSUER_URL or AUTH0_AUDIENCE env for JWT strategy',
      );
    }

    const issuer = issuerRaw.endsWith('/') ? issuerRaw : `${issuerRaw}/`;
    const jwksUri = `${issuer}.well-known/jwks.json`;

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      audience,
      issuer,
      algorithms: ['RS256'],
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        jwksUri,
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
      }) as any,
    });
  }

  async validate(payload: JwtUser): Promise<JwtUser> {
    return payload;
  }
}

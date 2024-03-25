import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ValidatedUser } from 'src/common/interfaces/validated-user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<ValidatedUser> {
        const user = await this.authService.validateUser(username, password);
        if (!user) throw new UnauthorizedException(`${username} not authorized`);
        return user;
    }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/data/models/user.model';
import { BcryptCryptographyService } from './cryptography/bcrypt-cryptography-service';
import { UserRepository } from 'src/data/repository/user-repository';
import { ValidatedUser } from 'src/common/interfaces/validated-user';
import { LoginResponse } from 'src/common/graphql/types/login-user.type';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private cryptographyService: BcryptCryptographyService
    ) {}

    async validateUser(username: string, password: string): Promise<ValidatedUser> {
        const user = await this.userRepository.getOne({
            email: username,
        });
        if (
            user &&
            !user.isBlocked &&
            !user.isDeleted &&
            (await this.cryptographyService.comparePasswords(password, user.passwordHash))
        ) {
            return {
                _id: user._id.toString(),
                email: user.email,
                password: user.passwordHash,
                role: user.role,
            };
        }
        return null;
    }

    async login(user: User): Promise<LoginResponse> {
        const accessToken = await this.jwtService.signAsync({
            email: user.email,
            role: user.role,
            sub: user._id,
        });
        const fullUserInfo = await this.userRepository.getOne({ _id: user._id });
        return {
            accessToken: accessToken,
            user: fullUserInfo,
        };
    }
}

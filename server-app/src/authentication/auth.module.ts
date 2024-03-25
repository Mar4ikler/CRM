import { Module } from '@nestjs/common';
import { GraphQLConfigModule } from 'src/config/graphql/config.module';
import { JwtConfigModule } from 'src/config/jwt/config.module';
import { MongoConfigModule } from 'src/config/mongo/config.module';
import { UserFeatureConfigModule } from 'src/config/mongo/features/user-feature.config.module';
import { UserRepository } from 'src/data/repository/user-repository';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { BcryptCryptographyService } from './cryptography/bcrypt-cryptography-service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
    imports: [GraphQLConfigModule, MongoConfigModule, JwtConfigModule, UserFeatureConfigModule],
    providers: [
        AuthResolver,
        AuthService,
        BcryptCryptographyService,
        UserRepository,
        LocalStrategy,
        JwtStrategy,
    ],
})
export class AuthModule {}

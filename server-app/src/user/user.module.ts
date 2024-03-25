import { Module } from '@nestjs/common';
import { BcryptCryptographyService } from 'src/authentication/cryptography/bcrypt-cryptography-service';
import { GraphQLConfigModule } from 'src/config/graphql/config.module';
import { MongoConfigModule } from 'src/config/mongo/config.module';
import { UserFeatureConfigModule } from 'src/config/mongo/features/user-feature.config.module';
import { UserRepository } from 'src/data/repository/user-repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    imports: [GraphQLConfigModule, MongoConfigModule, UserFeatureConfigModule],
    providers: [UserResolver, UserService, UserRepository, BcryptCryptographyService],
})
export class UserModule {}

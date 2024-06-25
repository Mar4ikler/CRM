import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { verifyJWTFromHeader } from '../../common/helpers/verifyJWTFromHeader';

@Module({
    imports: [
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            imports: [ConfigModule, JwtModule],
            driver: ApolloDriver,
            useFactory: (configService: ConfigService, jwtService: JwtService) => ({
                path: '/api',
                autoSchemaFile: join(process.cwd(), 'schema.gql'),
                sortSchema: true,
                subscriptions: {
                    'graphql-ws': {
                        onConnect: async (context: any): Promise<any> => {
                            try {
                                const decoded = verifyJWTFromHeader(
                                    context,
                                    configService,
                                    jwtService
                                );
                                return decoded ?? false;
                            } catch (e) {
                                return false;
                            }
                        },
                    },
                },
            }),
            inject: [ConfigService, JwtService],
        }),
    ],
})
export class GraphQLConfigModule {}

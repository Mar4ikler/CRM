import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => {
                return {
                    secret: configService.get<string>('JWT_ACCESS_SECRET'),
                    signOptions: {
                        audience: configService.get<string>('JWT_AUDIENCE'),
                        issuer: configService.get<string>('JWT_ISSUER'),
                        expiresIn: configService.get<string>('JWT_ACCESS_EXPIRES'),
                    },
                };
            },
            inject: [ConfigService],
        }),
    ],
    exports: [JwtModule],
})
export class JwtConfigModule {}

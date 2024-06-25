/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

export const verifyJWTFromHeader = async (
    ctx: any,
    configService: ConfigService,
    jwtService: JwtService
): Promise<any> => {
    //const { authToken } = ctx.connectionParams;
    const authToken = ctx.connectionParams.authToken ?? ctx.extra.request.headers.authorization;
    const accessToken = authToken.replace('Bearer ', '');
    if (accessToken) {
        const decoded = await jwtService.verifyAsync(accessToken, {
            secret: configService.get('JWT_ACCESS_SECRET'),
        });
        return decoded;
    }
    return null;
};

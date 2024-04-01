import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './authentication/auth.module';
import { ExceptionsModule } from './common/filters/exception/exception.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        ExceptionsModule,
        AuthModule,
        UserModule,
        TaskModule
    ],
})
export class AppModule {}

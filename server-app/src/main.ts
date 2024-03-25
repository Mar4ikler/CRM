/* eslint-disable no-console */
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const port = process.env.PORT || 4000;
const address = process.env.ADDRESS || '0.0.0.0';

async function bootstrap(): Promise<NestExpressApplication> {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    if (process.env.NODE_ENV === 'dev') {
        app.enableCors({
            credentials: true,
            origin: true,
        });
    }

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(port, address);

    return app;
}

bootstrap()
    .then(() => {
        console.log(`Server is running on http://${address}:${port}`);
    })
    .catch((error) => {
        console.error('Error starting the server', error);
    });

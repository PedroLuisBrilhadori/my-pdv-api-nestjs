import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { useContainer } from 'class-validator';

config();

async function bootstrap() {
    let httpsOptions: { key?: Buffer; cert?: Buffer } = {};

    if (process.env.HTTPS) {
        httpsOptions = {
            key: readFileSync('./certificates/localhost-key.pem'),
            cert: readFileSync('./certificates/localhost.pem'),
        };
    }

    let app = httpsOptions?.key
        ? await NestFactory.create(AppModule, { httpsOptions })
        : await NestFactory.create(AppModule);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );

    app.enableCors();

    await app.listen(3001);
}

bootstrap()
    .then(() => {
        console.log('App bootstrapted');
    })
    .catch((error) => {
        console.error('App not bootstrapted');
        console.error(error);
    });

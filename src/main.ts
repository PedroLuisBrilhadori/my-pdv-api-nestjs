import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { readFileSync } from 'fs';

config();

async function bootstrap() {
    let httpsOptions = {}

    if (process.env.HTTPS) {
        httpsOptions = {
           key: readFileSync('./certificates/localhost-key.pem'),
           cert: readFileSync('./certificates/localhost.pem'),
       };
    }

    const app = await NestFactory.create(AppModule, { httpsOptions });
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );
    app.enableCors();
    await app.listen(3001);
}

bootstrap().then(() => {
    console.log('App bootstrapted');
}).catch((error) => {
    console.error('App not bootstrapted');
    console.error(error);
})

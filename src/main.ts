import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';
import { ConfigAppService } from './config/config.service';

async function bootstrap() {
    const httpsOptions = {
        key: readFileSync('./certificates/localhost-key.pem'),
        cert: readFileSync('./certificates/localhost.pem'),
    };

    const app = await NestFactory.create(AppModule, { httpsOptions });
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();

    const configService = app.get(ConfigAppService);
    const port = configService.getNumber('PORT');
    await app.listen(port);
}
bootstrap();

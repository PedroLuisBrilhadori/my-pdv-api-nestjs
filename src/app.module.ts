import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PdvModule } from './modules/pdv.module';
import { getOrmConfig } from './config';
import { ConfigAppModule } from './config/config.module';
import { ConfigAppService } from './config/config.service';

@Module({
    controllers: [],
    imports: [
        ConfigAppModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigAppModule],
            inject: [ConfigAppService],
            useFactory: async (configService: ConfigAppService) =>
                await getOrmConfig(configService),
        }),
        PdvModule,
    ],
    providers: [ConfigAppService],
})
export class AppModule {}

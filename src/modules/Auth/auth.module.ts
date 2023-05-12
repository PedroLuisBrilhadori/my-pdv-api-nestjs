import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { ConfigAppModule } from 'src/config/config.module';
import { ConfigAppService } from 'src/config/config.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local-strategy';
import { AuthController } from './auth.controller';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '../user/model/user.model';
import { UserModule } from '../user/user.module';
import { JwtConfigService } from './constants';

@Module({
    imports: [
        ConfigAppModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigAppModule],
            inject: [ConfigAppService],
            useClass: JwtConfigService,
        }),
        TypeOrmModule.forFeature([User]),
        forwardRef(() => UserModule),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, LocalStrategy, LocalAuthGuard],
    exports: [AuthService],
})
export class AuthModule {}

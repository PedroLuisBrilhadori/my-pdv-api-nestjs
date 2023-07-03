import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/model/user.model';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { LocalAuthGuard } from './guards';
import { LocalStrategy, JwtStrategy } from './strategies';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1h' },
        }),
        TypeOrmModule.forFeature([User]),
        forwardRef(() => UserModule),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, LocalAuthGuard, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}

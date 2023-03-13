import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './Auth/auth.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';

@Module({
    imports: [UserModule, AuthModule, ProductModule, CartModule],
})
export class PdvModule {}

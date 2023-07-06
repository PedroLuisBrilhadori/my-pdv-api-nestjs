import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './Auth/auth.module';
import { ProductModule } from './product/product.module';
import { PurchaseModule } from './purchase/purchase.module';

@Module({
    imports: [UserModule, AuthModule, ProductModule, PurchaseModule],
})
export class PdvModule {}

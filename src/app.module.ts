import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [UserModule, AuthModule, ConfigModule.forRoot({
    isGlobal: true
  }), DatabaseModule, ProductModule],
  controllers: [AppController],
})
export class AppModule { }

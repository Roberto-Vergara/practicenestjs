import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  // recordar que debemos importar nuestro modulos y dependencias para que no hallan errores
  imports: [UserModule, PassportModule, ConfigModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      secret: configService.get("ACCESS_TOKEN"),
      signOptions: { expiresIn: "60s" }

    }),
    inject: [ConfigService]
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }

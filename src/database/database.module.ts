import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

console.log(__dirname);


@Module({
    imports: [TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
            type: "mysql",
            host: configService.get("HOST"),
            port: configService.get<number>("PORT"),
            username: configService.get<string>("USER_NAME"),
            database: configService.get("DATABASE"),
            password: configService.get("PASSWORD"),
            entities: ["dist/**/*.entity{.ts,.js}"],
            synchronize: true
        }),
        inject: [ConfigService]
    })],
})
export class DatabaseModule { }

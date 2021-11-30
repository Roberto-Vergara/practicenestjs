import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),//en las cabezeras usar Authorization: Bearer nuestrotokenaqui
            ignoreExpiration: false,
            secretOrKey: configService.get("ACCESS_TOKEN")
        })
    }

    // this function is executed when authguard is used
    validate(payload) {
        console.log(payload);

        return { email: payload.email, id: payload.id }
    }
}
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly authService: AuthService) {
        super({ usernameField: "email" })
    }


    async validate(email: string, password: string) {
        console.log("auto exec");

        try {
            const userData = this.authService.validateUser(email, password)
            if (!userData) {
                throw new UnauthorizedException()
            }
            return userData
            // this will be atach to request
        } catch (error) {
            throw new UnauthorizedException()
        }
    }
}
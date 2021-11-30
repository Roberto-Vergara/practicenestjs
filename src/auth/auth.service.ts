import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {

    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findUser(email);
        const match = await bcrypt.compare(password, user.password)
        if (user && match) {
            const { email, id } = user;
            return { email, id }
        }
        return null
    }

    async login(user) {
        const payload = { email: user.email, id: user.id }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

}

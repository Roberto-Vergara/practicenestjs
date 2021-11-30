import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"
import { User } from './user.entity';
import { UserPostDto } from './dto/user-post.dto';
import { v4 as uuidv4 } from "uuid"

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }


    async createUser(user: UserPostDto) {
        const { name, email, password, city } = user;
        const hashPass = await bcrypt.hash(password, 8)
        const genId = uuidv4();//this methods create a unique id
        const data = this.userRepository.create({ id: genId, name, email, password: hashPass, city });
        try {
            await data.save()
            return { ok: true, message: "user was create", data }
        } catch (error) {
            throw new HttpException({ ok: false, message: "error in create user" }, HttpStatus.FORBIDDEN)
        }
    }

    async findUser(email: string) {
        try {
            const user = await this.userRepository.findOne({ email })
            if (!user) {
                throw { ok: false, message: "user not found", status: 404 }
            }
            return user

        } catch (error) {
            throw new HttpException(error, HttpStatus.NOT_FOUND)
        }
    }

    async getUsers() {
        const users = await this.userRepository.find()
        return users
    }

    async getUser(userId: string) {
        try {
            const user = await this.userRepository.findOne(userId)

            if (!user) {
                throw { ok: false, message: "user not found", status: 404 }
            }
            const { city, name, id } = user;
            return { city, name, id }
        } catch (error) {
            throw new HttpException(error, HttpStatus.NOT_FOUND)

        }
    }


    async getUserProducts(userId: string) {
        try {
            const products = await this.userRepository.findOne({ relations: ["products"], where: { id: userId } });

            if (!products) {
                throw { ok: false, message: "user not found", status: 404 }
            }
            return products.products;
        } catch (error) {
            throw new HttpException(error, HttpStatus.NOT_FOUND)
        }
    }

    async getUserProduct(ids) {
        const { userId, productId } = ids;
        try {
            const product = await this.userRepository.findOne({ relations: ["products"], where: { id: userId } })
            if (!product) {
                throw { ok: false, message: "userId is incorrect", status: 404 }
            }
            const producto = product.products.find((producto) => productId === producto.id)
            if (!producto) {
                throw { ok: false, message: "productId is incorrect", status: 404 }
            }

            return producto;
        } catch (error) {
            throw new HttpException(error, HttpStatus.NOT_FOUND)
        }
    }
}

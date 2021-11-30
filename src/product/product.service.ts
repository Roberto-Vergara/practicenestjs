import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { v4 } from 'uuid';
import { User } from 'src/user/user.entity';

type product = {
    id: string;
    name: string;
    price: number;
    description: string;
    imgUrl: string;
}

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>, @InjectRepository(User) private userRepository: Repository<User>) { }

    async createProduct(product: any, userId: string): Promise<product> {
        const { name, price, imgUrl, description } = product;
        const genId = v4()
        try {
            //necesary to create relationship
            const user = await this.userRepository.findOne(userId)
            if (!user) {
                throw { ok: false, message: "incorrect user id", status: 404 }
            }
            const createdPro = this.productRepository.create({ id: genId, name, price, description, imgUrl, user })
            //user field is necesary to implements relationship
            if (!createdPro) {
                throw { ok: false, message: "error in create product", status: 403 }
            }
            await createdPro.save()
            return createdPro;
        } catch (error) {
            throw new HttpException(error, error.status)
        }
    }

    async getProducts() {
        const products = await this.productRepository.find();
        return products;
    }

    async getProduct(id: string) {
        try {
            const product = await this.productRepository.findOne(id);
            if (!product) {
                throw { ok: false, message: "product not found", status: 404 }
            }
            return product

        } catch (error) {
            throw new HttpException(error, error.status)
        }

    }

}

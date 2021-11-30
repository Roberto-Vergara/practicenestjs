import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductPostDto } from './dto/product-post.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService) {

    }

    @Post(":userId")
    createProduct(@Body() product: ProductPostDto, @Param("userId") id: string) {
        return this.productService.createProduct(product, id)
    }

    @Get("/")
    getProducts() {
        return this.productService.getProducts()
    }

    @Get(":id")
    getProduct(@Param("id") id: string) {
        return this.productService.getProduct(id)
    }
}

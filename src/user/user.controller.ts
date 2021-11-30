import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserPostDto } from './dto/user-post.dto';
import { UserService } from './user.service';
import { ParseUUIDPipe } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {

    }

    @Post("/")
    createUser(@Body() user: UserPostDto) {
        return this.userService.createUser(user)
    }

    @Get("/")
    getUsers() {
        return this.userService.getUsers()
    }


    @Get(":id")
    getUser(@Param("id", ParseUUIDPipe) id: string) {
        return this.userService.getUser(id)
    }

    @Get(":id/product")
    getUserProducts(@Param("id", ParseUUIDPipe) id: string) {
        return this.userService.getUserProducts(id)
    }

    @Get(":userId/product/:productId")
    getUserProduct(@Param() ids) {
        return this.userService.getUserProduct(ids)
    }
}

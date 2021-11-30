import { IsNumber, IsString } from "class-validator";

export class ProductPostDto {

    @IsString()
    name: string

    @IsNumber()
    price: string;

    @IsString()
    description: string;

    @IsString()
    imgUrl: string;
}
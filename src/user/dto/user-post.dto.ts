import { IsString, IsEmail } from "class-validator";
export class UserPostDto {
    @IsString()
    name: string;

    @IsString()
    password: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    city: string;
}
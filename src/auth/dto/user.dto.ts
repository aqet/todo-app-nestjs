import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class UserDto{
    @IsOptional()
    @IsEmail({}, {message: 'Please enter a valid email'}) 
    email: string;

    @IsString()
    Username: string;

    @IsString()
    password: string;

    @IsOptional()
    @IsBoolean()
    isLogged: boolean;

    @IsOptional()
    @IsString()
    imageUrl: string
} 
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTodoDto{
    // @IsNotEmpty()
    // @IsNumber()
    // id: number;

    @IsString()
    title: string;

    @IsArray()
    tasks: {
        name: string
    }[];
}
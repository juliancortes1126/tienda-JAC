import { IsInt, IsString } from "class-validator";

export class CreateProductDto {
    
    @IsString()
    description: string;
    
    @IsInt()
    price: number;

    @IsInt()
    status: number;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {

    @IsString()
    @IsOptional()
    description?: string;
        
    @IsInt()
    @IsOptional()
    price?: number;
    
    @IsInt()
    @IsOptional()
    status?: number;
}

import { IsDate, IsInt, isInt, IsNumber, IsPositive, IsString, IsTaxId } from "class-validator";
import { Product } from "src/products/entities/product.entity";

export class CreateTransactionDto {

    @IsString()
    typeDocument: string;

    @IsString()
    numberDocument: string;
    
    @IsString()
    nameCustomer: string;
    
    @IsString()
    emailCustomer: string;
    
    @IsString()
    phoneCustomer: string;
    
    product: Product;
    
    @IsInt()
    @IsPositive()
    quantity: number;
    
    @IsNumber()
    valuePurchase: number;

    @IsDate()
    datePurchase: Date;

    @IsString()
    numberTransaction: string;
    
    @IsString()
    reference: string;
    
    @IsString()
    statusTransaction: string; 

    acceptance_token: string;
    cardToken: string;
}

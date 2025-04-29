import { IsDate, IsNumber, IsString } from "class-validator";
import { LargeNumberLike } from "crypto";
import { Product } from "src/products/entities/product.entity";

export class CreateTransactionDto {

    typeDocument: string;
    
    @IsString()
    numberDocument: string;
        
    nameCustomer: string;
        
    emailCustomer: string;
        
    phoneCustomer: string;
    
    product: Product;
        
    quantity: number;
        
    valuePurchase: number;
    numberTransaction: string;
    reference: string;
    statusTransaction: string;  

}

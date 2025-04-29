import { IsDate, IsNumber, IsString } from "class-validator";

export class TransactionDto {

    @IsString()
    customer_email: string;
    @IsString()
    typeDocument: string;
    @IsString()
    numberDocument: string;
    @IsString()
    nameCustomer: string;
    @IsString()
    acceptanceToken: string;
    @IsString()
    token: string;
    @IsNumber()
    idProduct: number;

}

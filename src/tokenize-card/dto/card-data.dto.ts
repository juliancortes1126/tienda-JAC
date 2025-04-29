import { IsNumber, IsString } from "class-validator";

export class CardDataDto{
    
    @IsString()
    number: string;

    @IsString()
    exp_month: string;

    @IsString()
    exp_year: string;

    @IsString()
    cvc: string;

    @IsString()
    card_holder: string;
}
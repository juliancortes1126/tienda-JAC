import { PaymentMethodDto } from "./payment.method.dto";

export class TransactionLoadWompiDto{

    acceptance_token: string;
    amount_in_cents: number;
    currency: string;
    customer_email: string;
    payment_method: PaymentMethodDto;
    reference: string;
    redirect_url: string; 
    signature: string;

}
import { Body, Controller, Post } from '@nestjs/common';
import { ProcessPaymentService } from './process-payment.service';
import { TransactionDto } from './dto/transaction.dto';

@Controller('process-payment')
export class ProcessPaymentController {

    constructor (private readonly processPaymentService: ProcessPaymentService){}

    @Post()
    async postProcessPayment(@Body() dto: TransactionDto){
        return this.processPaymentService.processPayment(dto); 
    }
}

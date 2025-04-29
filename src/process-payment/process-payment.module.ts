import { Module } from '@nestjs/common';
import { ProcessPaymentController } from './process-payment.controller';
import { ProcessPaymentService } from './process-payment.service';

@Module({
  controllers: [ProcessPaymentController],
  providers: [ProcessPaymentService]
})
export class ProcessPaymentModule {}

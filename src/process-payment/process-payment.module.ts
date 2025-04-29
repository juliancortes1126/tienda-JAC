import { Module } from '@nestjs/common';
import { ProcessPaymentController } from './process-payment.controller';
import { ProcessPaymentService } from './process-payment.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from 'src/products/products.module';
import { TransactionsService } from 'src/transactions/transactions.service';
import { TransactionsModule } from 'src/transactions/transactions.module';

@Module({
  imports: [ProductsModule, HttpModule, ConfigModule, TransactionsModule],
  controllers: [ProcessPaymentController],
  providers: [ProcessPaymentService]
})
export class ProcessPaymentModule {}

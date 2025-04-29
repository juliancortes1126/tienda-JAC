import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockModule } from './stock/stock.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TokenizeCardModule } from './tokenize-card/tokenize-card.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ProcessPaymentModule } from './process-payment/process-payment.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true})
    , HttpModule, 
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_BDNAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductsModule,
    StockModule,
    TransactionsModule,
    TokenizeCardModule,
    ProcessPaymentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

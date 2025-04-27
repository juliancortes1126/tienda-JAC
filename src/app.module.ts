import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [ProductsModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "user_dev",
      password: "user_dev",
      database: "storedb",
      autoLoadEntities: true,
      synchronize: true,
    }),
    StockModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

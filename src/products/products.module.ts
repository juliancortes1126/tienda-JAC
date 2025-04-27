import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { RegisterProductUseCase } from 'src/usecases/RegisterProductUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService, RegisterProductUseCase],
  exports: [TypeOrmModule]
})
export class ProductsModule {}

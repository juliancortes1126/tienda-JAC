import { Injectable } from "@nestjs/common";
import { Result, ok, err } from "src/core/result/Result";
import { CreateProductDto } from "src/products/dto/create-product.dto";
import { Product } from "src/products/entities/product.entity";
import { ProductsService } from "src/products/products.service";

    
    @Injectable()
    export class RegisterProductUseCase {

        constructor(private readonly productService: ProductsService) {}
        
        async execute(dto: CreateProductDto): Promise<Result<Product, string>> {
            if (!dto.description) return err('Product description is required');
            if (dto.price <= 0) return err('Price must be greater than 0');
            if (dto.status > 1) return err('Product status is value between 0 and 1');
            
        
            try {
              const product = await this.productService.create(dto);
              return ok(product);
            } catch (e: any) {
              return err('Error creating product: ' + e.message);
            }
          }

  }
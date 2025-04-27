import { Injectable } from "@nestjs/common";
import { Result } from "src/core/result/Result";
import { Product } from "src/products/entities/product.entity";
import { ProductsService } from "src/products/products.service";



@Injectable()
export class FindAllProductUseCase{

    constructor(private readonly productService: ProductsService) {}
 /*
    async execute(): Promise<Result<Product[], string>> {

       
                if (!dto.description) return err('Product description is required');
                if (dto.price <= 0) return err('Price must be greater than 0');
                if (dto.status > 1) return err('Product status is value between 0 and 1');
                
          
        try {
                  
            const product = await this.productsService.findAll();
                  
            
            return ok(product);
                } catch (e: any) {
                  return err('Error creating product: ' + e.message);nes
                }
              }
                */  


}
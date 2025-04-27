import { RegisterProductUseCase } from './RegisterProductUseCase';
import { ProductsService } from 'src/products/products.service';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { Product } from 'src/products/entities/product.entity';
import { ok, err } from 'src/core/result/Result';

describe('RegisterProductUseCase', () => {
  let useCase: RegisterProductUseCase;
  let productService: ProductsService;

  beforeEach(() => {
    productService = {
      create: jest.fn(),
    } as any;

    useCase = new RegisterProductUseCase(productService);
  });

  it('debería fallar si la descripción está vacía', async () => {
    const dto = { price: 100, status: 1 } as CreateProductDto;

    const result = await useCase.execute(dto);

    if (result.isErr) {
        expect(result.error).toBe('Product description is required');
      }
  });

  it('debería fallar si el precio es menor o igual a 0', async () => {
    const dto = { description: 'Test', price: 0, status: 1 } as CreateProductDto;

    const result = await useCase.execute(dto);

    if (result.isErr) {
        expect(result.error).toBe('Price must be greater than 0');
    }

    
  });

  it('debería fallar si el status es mayor a 1', async () => {
    const dto = { description: 'Test', price: 100, status: 2 } as CreateProductDto;

    const result = await useCase.execute(dto);

    if (result.isErr) {
        expect(result.error).toBe('Product status is value between 0 and 1');
    }
    
  });

  it('debería registrar el producto correctamente si los datos son válidos', async () => {
    const dto = { description: 'Test', price: 100, status: 1 } as CreateProductDto;
    const product = { idProduct: 1, ...dto } as Product;

    (productService.create as jest.Mock).mockResolvedValue(product);

    const result = await useCase.execute(dto);

    expect(result.isOk).toBe(true);
    expect(productService.create).toHaveBeenCalledWith(dto);
  });

  it('debería manejar errores del service', async () => {
    const dto = { description: 'Test', price: 100, status: 1 } as CreateProductDto;

    (productService.create as jest.Mock).mockRejectedValue(new Error('DB error'));

    const result = await useCase.execute(dto);

    expect(result.isErr).toBe(true);
    if (result.isErr) {
        expect(result.error).toBe('Error creating product: DB error');
    }
    
  });
});

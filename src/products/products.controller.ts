import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RegisterProductUseCase } from 'src/usecases/RegisterProductUseCase';
import { Response } from 'express';

@Controller('products')
export class ProductsController {

  constructor(private readonly registerProductUseCase: RegisterProductUseCase) {}



  @Post()
  async create(@Body() dto: CreateProductDto, @Res() res: Response) {
    const result = await this.registerProductUseCase.execute(dto);
    
    if (result.isOk) {
      return res.status(201).json(result.value);
    } else {
      return res.status(400).json({ error: result.error });
    }
  }

  /* 
    @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productsService.remove(id);
  }*/


}

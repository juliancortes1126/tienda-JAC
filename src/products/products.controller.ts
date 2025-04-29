import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from 'express';

@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() dto: CreateProductDto, @Res() res: Response) {
    const result = await this.productsService.create(dto);
    
    return result;
  }

   
  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':idProduct')
  async findOne(@Param('idProduct') idProduct: number) {
    return this.productsService.findOne(idProduct);
  }

  @Patch(':idProduct')
  async update(@Param('idProduct') idProduct: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(idProduct, updateProductDto);
  }

  @Delete(':idProduct')
  async remove(@Param('idProduct') idProduct: number) {
    return this.productsService.remove(idProduct);
  }


}

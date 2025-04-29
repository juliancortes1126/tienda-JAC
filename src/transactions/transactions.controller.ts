import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  async findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':idTransaction')
  findOne(@Param('idTransaction') idTransaction: number) {
    return this.transactionsService.findOne(idTransaction);
  }

  @Patch(':idTransaction')
  update(@Param('idTransaction') idTransaction: number, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(idTransaction, updateTransactionDto);
  }

  @Delete(':idTransaction')
  remove(@Param('idTransaction') idTransaction: number) {
    return this.transactionsService.remove(idTransaction);
  }
}

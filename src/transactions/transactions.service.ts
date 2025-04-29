import { Injectable, Res } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';


@Injectable()
export class TransactionsService {


  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepositorio: Repository<Transaction>,
  ){}

  async create(dto: CreateTransactionDto) {   
    const transaction = this.transactionRepositorio.create(dto);
    return await this.transactionRepositorio.save(transaction);
  }

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}

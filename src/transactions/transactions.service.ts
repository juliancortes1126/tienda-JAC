import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { ConfigService } from '@nestjs/config';
import SHA256 from 'crypto-js/sha256';
import { PaymentMethodDto } from './dto/payment.method.dto';
import { TransactionLoadWompiDto } from './dto/transaction-load-wompi.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class TransactionsService {


  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepositorio: Repository<Transaction>,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ){}

  async create(createTransactionDto: CreateTransactionDto) {

    const externalUrl = `${this.configService.get<string>('BASE_URL_WOMPI')}/transactions` ;
    const token = this.configService.get<string>('PUBLIC_KEY'); 
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    var referencia = `TESTJACG-${Date.now()}`;
    var secretIdentity = `${this.configService.get<string>('SECRET_IDENTITY')}`; 
    var monedaLocal = `${this.configService.get<string>('MONEDA_LOCAL')}`; 
    
    var cadenaConcatenada = referencia +  createTransactionDto.valuePurchase +   "00" + monedaLocal + secretIdentity;
    const signature = SHA256(cadenaConcatenada).toString();

    const transactionLoad = new TransactionLoadWompiDto();
    const pymentMethod = new PaymentMethodDto();

    pymentMethod.type = 'CARD';
    pymentMethod.installments = 1;
    pymentMethod.token = createTransactionDto.cardToken;

    transactionLoad.acceptance_token = createTransactionDto.acceptance_token;
    transactionLoad.amount_in_cents = createTransactionDto.product.price;
    transactionLoad.currency = monedaLocal;
    transactionLoad.customer_email = createTransactionDto.emailCustomer;
    transactionLoad.payment_method = pymentMethod
    transactionLoad.redirect_url ='https://sandbox.wompi.co/';
    transactionLoad.reference = referencia;
    transactionLoad.signature = signature;

    const response = await firstValueFrom(
               this.httpService.post(externalUrl, transactionLoad, { headers }),
              );

    console.log(response);   

    const transaction = this.transactionRepositorio.create(createTransactionDto);
    return this.transactionRepositorio.save(transaction);
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

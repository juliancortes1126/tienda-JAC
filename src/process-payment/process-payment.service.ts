import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProductsService } from 'src/products/products.service';
import { TransactionLoadWompiDto } from './dto/transaction-load-wompi.dto';
import { PaymentMethodDto } from './dto/payment.method.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TransactionsService } from 'src/transactions/transactions.service';
import { CreateTransactionDto } from 'src/transactions/dto/create-transaction.dto';

@Injectable()
export class ProcessPaymentService {

    constructor (
        private readonly configService: ConfigService,
        private readonly productService: ProductsService,
        private readonly httpService: HttpService,
        private readonly transactionService: TransactionsService
    ){}

    async processPayment(processData: any){
        //Traer el producto
        const product = await this.productService.findOne(processData.idProduct);

        console.log('Trajo el producto:');
        console.table(product);

        const externalUrl = `${this.configService.get<string>('BASE_URL_WOMPI')}/transactions` ;
        const token = this.configService.get<string>('PUBLIC_KEY'); 
    
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
    
        var referencia = `TESTJACG-${Date.now()}`;
        var secretIdentity = `${this.configService.get<string>('SECRET_IDENTITY')}`; 
        var monedaLocal = `${this.configService.get<string>('MONEDA_LOCAL')}`; 
        
        var cadenaConcatenada = referencia +  product?.price + monedaLocal + secretIdentity;

        const encondedText = new TextEncoder().encode(cadenaConcatenada);
        const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const signature = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
        const amount = product?.price;
    
        const transactionLoad = new TransactionLoadWompiDto();
        const pymentMethod = new PaymentMethodDto();
    
        pymentMethod.type = 'CARD';
        pymentMethod.installments = 1;
        pymentMethod.token = processData.token;
    
        transactionLoad.acceptance_token = processData.acceptanceToken;
        transactionLoad.amount_in_cents = Number(amount);
        transactionLoad.currency = monedaLocal;
        transactionLoad.customer_email = processData.customer_email;
        transactionLoad.payment_method = pymentMethod
        transactionLoad.redirect_url ='https://sandbox.wompi.co/';
        transactionLoad.reference = referencia;
        transactionLoad.signature = signature;
    
        const response = (await firstValueFrom(
                   this.httpService.post(externalUrl, transactionLoad, { headers }),
                  )).data;
    
        console.log('Transaccion Wompi:');
        console.log(response);  

        //Registrar la transacciòn en la Base de Datos
        const createTransactionDTO = new CreateTransactionDto(); 
        createTransactionDTO.emailCustomer = processData.customer_email;
        createTransactionDTO.nameCustomer = processData.nameCustomer;
        createTransactionDTO.numberDocument = processData.numberDocument;
        createTransactionDTO.phoneCustomer = "1111";
        //createTransactionDTO.product.idProduct = product.idProduct;
        createTransactionDTO.quantity = 1;
        createTransactionDTO.idProduct = 1;
        createTransactionDTO.reference = referencia;
        createTransactionDTO.statusTransaction = response.data.status;
        createTransactionDTO.typeDocument = processData.typeDocument;
        createTransactionDTO.valuePurchase = 80000
        createTransactionDTO.numberTransaction = response.data.id;


        const transaction = await this.transactionService.create(createTransactionDTO);

        return response;
    }
}

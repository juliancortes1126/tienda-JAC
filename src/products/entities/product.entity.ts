import { Stock } from "src/stock/entities/stock.entity";
import { Transaction } from "src/transactions/entities/transaction.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    idProduct: number;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    status: number;

    @OneToMany(()=>Stock,(stock)=>stock.product)
    stockList: Stock[];

    @OneToMany(()=>Transaction, (transaction)=>transaction.product)
    transactionList: Transaction;
}

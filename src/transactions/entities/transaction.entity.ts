import { Product } from "src/products/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn()
    idTransaction: number;

    @Column()
    typeDocument: string;

    @Column()
    numberDocument: string;
    
    @Column()
    nameCustomer: string;
    
    @Column()
    emailCustomer: string;
    
    @Column()
    phoneCustomer: string;
    
    @ManyToOne(()=> Product, (product)=> product.idProduct, {
            eager: true //Para traerlo cuando se hace un findOne
        })
    product: Product;
    
    @Column()
    quantity: number;
    
    @Column()
    valuePurchase: number;

    @Column()
    datePurchase: Date;

    @Column()
    numberTransaction: string;
    
    @Column()
    reference: string;
    
    @Column()
    statusTransaction: string;  

}

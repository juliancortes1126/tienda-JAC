import { Product } from "src/products/entities/product.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Stock {

    @PrimaryGeneratedColumn()
    idStock: number;

    @ManyToOne(()=> Product, (product)=> product.idProduct, {
        eager: true //Para traerlo cuando se hace un findOne
    })
    product: Product;
    
    @Column()
    color: string;
    
    @Column()
    size: number;
    
    @Column()
    quantity: number;
}

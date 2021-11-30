import { Product } from "src/product/product.entity";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, OneToMany } from "typeorm";

@Entity("user")
export class User extends BaseEntity {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    city: string

    @OneToMany(type => Product, product => product.user)
    products: Product[];
}
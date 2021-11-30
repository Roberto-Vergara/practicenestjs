import { User } from "src/user/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";


@Entity("product")
export class Product extends BaseEntity {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    description: string;

    @Column()
    imgUrl: string;

    @ManyToOne(type => User, user => user.products)//user.product find relation field
    @JoinColumn({
        name: "user_id"//create a user_id field in product table
    })
    user: User;//necesary to relate product with user
}
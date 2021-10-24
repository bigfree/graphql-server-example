import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { ImportDates } from "../ImportDates";
import { CustomerAddress } from "./CustomerAddress";

@Entity()
@ObjectType()
export class Customer extends ImportDates {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field({ nullable: true })
    @Generated('uuid')
    @Column({ type: 'uuid' })
    readonly uuid?: string;

    @Field()
    @Column()
    name: string;

    @Field(() => [CustomerAddress], { nullable: true })
    @OneToMany(
        () => CustomerAddress,
        (customerAddress: CustomerAddress) => customerAddress.customer,
        {
            nullable: true,
            eager: true,
            cascade: [
                "insert", "update", "remove"
            ],
            onDelete: "CASCADE"
        }
    )
    customerAddress?: CustomerAddress[];
}
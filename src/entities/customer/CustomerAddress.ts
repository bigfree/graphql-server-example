import { Column, Entity, Generated, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { ImportDates } from "../ImportDates";
import { Customer } from "./Customer";

@Entity()
@ObjectType()
export class CustomerAddress extends ImportDates {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field(() => Customer)
    @ManyToOne(() => Customer, (customer: Customer) => customer.customerAddress, {
        onDelete: "CASCADE"
    })
    customer: Customer;

    @Field(() => String)
    @Generated("uuid")
    @Column({ type: "uuid" })
    readonly uuid: string;

    @Field()
    @Column()
    group: string;

    @Field({ nullable: true })
    @Column({ type: "text", nullable: true })
    description?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    street?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    streetNumber?: string;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    postalCode?: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    city?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    state?: string;

    @Field()
    @Column({ default: false })
    isDefault: boolean;
}
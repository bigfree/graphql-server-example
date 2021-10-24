import { Column, Entity, ManyToOne } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Customer } from "./Customer";
import { AddressInterface } from "../interfaces/AddressInterface";
import { Node } from "../interfaces/Node";
import { NodeTimestamps } from "../interfaces/NodeTimestamps";

@Entity()
@ObjectType({ implements: [AddressInterface, NodeTimestamps, Node] })
export class CustomerAddress extends AddressInterface {
    @Field(() => Customer)
    @ManyToOne(
        () => Customer,
        (customer: Customer) => customer.customerAddress,
        {
            onDelete: "CASCADE"
        }
    )
    customer: Customer;

    @Field()
    @Column()
    group: string;

    @Field({ nullable: true })
    @Column('text', { nullable: true })
    description?: string;

    @Field()
    @Column({ default: false })
    isDefault: boolean;
}
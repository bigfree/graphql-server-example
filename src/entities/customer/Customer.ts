import { Column, Entity, OneToMany } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { CustomerAddress } from "./CustomerAddress";
import { Node } from "../interfaces/Node";
import { NodeTimestamps } from "../interfaces/NodeTimestamps";

@Entity()
@ObjectType({ implements: [NodeTimestamps, Node] })
export class Customer extends Node {
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
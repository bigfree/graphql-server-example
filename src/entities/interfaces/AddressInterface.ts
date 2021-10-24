import { Field, Int, InterfaceType } from "type-graphql";
import { Column } from "typeorm";
import { Node } from "./Node";

@InterfaceType({ implements: Node })
export abstract class AddressInterface extends Node {
    @Field({ nullable: true })
    @Column('varchar', { nullable: true, length: 255 })
    street?: string;

    @Field({ nullable: true })
    @Column('varchar', { nullable: true, length: 50 })
    streetNumber?: string;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    postalCode?: number;

    @Field({ nullable: true })
    @Column('varchar', { nullable: true, length: 255 })
    city?: string;

    @Field({ nullable: true })
    @Column('varchar', { nullable: true, length: 255 })
    state?: string;
}
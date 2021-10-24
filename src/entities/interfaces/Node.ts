import { Field, ID, InterfaceType } from "type-graphql";
import { Column, Generated, PrimaryGeneratedColumn } from "typeorm";
import { NodeTimestamps } from "./NodeTimestamps";

@InterfaceType({ implements: NodeTimestamps })
export abstract class Node extends NodeTimestamps {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field({ nullable: true })
    @Generated('uuid')
    @Column({ type: 'uuid' })
    readonly uuid?: string;
}
import { Field, ID, Int, ObjectType } from "type-graphql";
import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";
import { NodeTimestamps } from './interfaces/NodeTimestamps';

@Entity()
@ObjectType()
export class User extends NodeTimestamps {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Generated("uuid")
    @Column({ type: "uuid" })
    uuid: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column({ unique: true })
    email: string;

    @Field(() => Int)
    @Column({ type: "int" })
    age: number;
}
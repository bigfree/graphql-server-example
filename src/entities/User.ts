import { Field, ID, Int, ObjectType } from "type-graphql";
import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";
import { ImportDates } from './ImportDates';

@Entity()
@ObjectType()
export class User extends ImportDates {

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
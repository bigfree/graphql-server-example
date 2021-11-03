import { Column, Entity, ManyToOne } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { NodeTimestamps } from "../interfaces/NodeTimestamps";
import { Node } from "../interfaces/Node";
import { User } from "./User";

@Entity()
@ObjectType({ implements: [NodeTimestamps, Node] })
export class UserSignInToken extends Node {
    @Field(() => User)
    @ManyToOne(() => User, (user: User) => user.userSignInToken, {
        onDelete: "CASCADE"
    })
    user: User;

    @Field()
    @Column({ unique: true })
    token: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    deviceHash?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    ipAddress: string;
}
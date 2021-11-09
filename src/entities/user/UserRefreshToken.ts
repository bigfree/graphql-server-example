import { Column, Entity, ManyToOne } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { NodeTimestamps } from "../interfaces/NodeTimestamps";
import { Node } from "../interfaces/Node";
import { User } from "./User";
import { IsJWT } from "class-validator";

@Entity()
@ObjectType({ implements: [NodeTimestamps, Node] })
export class UserRefreshToken extends Node {
    @Field(() => User)
    @ManyToOne(() => User, (user: User) => user.userSignInToken, {
        onDelete: "CASCADE"
    })
    user: Promise<User>;

    @Field()
    @Column({ unique: true })
    @IsJWT()
    refreshToken: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    deviceHash?: string;

    @Field()
    @Column()
    validate: Date;
}
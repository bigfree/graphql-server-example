import { Column, Entity, OneToMany } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Node } from "../interfaces/Node";
import { NodeTimestamps } from "../interfaces/NodeTimestamps";
import { UserSex } from "../../enums/EntityEnums";
import { UserSignInToken } from "./UserSignInToken";
import { IsEmail, IsEnum, MaxLength } from "class-validator";

@Entity()
@ObjectType({ implements: [NodeTimestamps, Node] })
export class User extends Node {
    @Field({ nullable: true })
    @Column("varchar", { length: 50 })
    @MaxLength(50)
    firstName: string;

    @Field({ nullable: true })
    @Column("varchar", { length: 50 })
    @MaxLength(50)
    lastName: string;

    @Field()
    @Column("varchar", {
        length: 100,
        unique: true
    })
    @IsEmail()
    @MaxLength(100)
    email: string;

    @Column()
    password: string;

    @Column()
    passwordSalt: string;

    @Field(() => UserSex)
    @Column({
        type: "enum",
        enum: UserSex,
        default: UserSex.INTERSEX
    })
    @IsEnum(UserSex)
    sex: UserSex;

    @Field(() => [UserSignInToken], { nullable: true })
    @OneToMany(
        () => UserSignInToken,
        (userSignInToken: UserSignInToken) => userSignInToken.user,
        {
            nullable: true,
            eager: true,
            cascade: true,
            onDelete: "CASCADE"
        }
    )
    userSignInToken?: UserSignInToken[];
}
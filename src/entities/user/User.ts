import { Column, Entity, OneToMany } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Node } from "../interfaces/Node";
import { NodeTimestamps } from "../interfaces/NodeTimestamps";
import { UserSex } from "../../enums/UserSexEnums";
import { UserRefreshToken } from "./UserRefreshToken";
import { IsEmail, IsEnum, IsNotEmpty, MaxLength } from "class-validator";

@Entity()
@ObjectType({ implements: [NodeTimestamps, Node] })
export class User extends Node {
    @Field()
    @Column("varchar", { length: 50 })
    @IsNotEmpty()
    @MaxLength(50)
    firstName: string;

    @Field()
    @Column("varchar", { length: 50 })
    @IsNotEmpty()
    @MaxLength(50)
    lastName: string;

    @Field()
    @Column("varchar", {
        length: 100,
        unique: true,
    })
    @IsEmail()
    @MaxLength(100)
    email: string;

    @Column()
    password: string;

    @Field(() => UserSex)
    @Column({
        type: "enum",
        enum: UserSex,
        default: UserSex.INTERSEX
    })
    @IsEnum(UserSex)
    sex: UserSex;

    @Field(() => [UserRefreshToken], { nullable: true })
    @OneToMany(
        () => UserRefreshToken,
        (userSignInToken: UserRefreshToken) => userSignInToken.user,
        {
            nullable: true,
            eager: true,
            cascade: true,
            onDelete: "CASCADE"
        }
    )
    userSignInToken?: Promise<UserRefreshToken[]>;
}
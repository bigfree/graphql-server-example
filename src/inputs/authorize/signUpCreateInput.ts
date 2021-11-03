import { Field, InputType } from "type-graphql";
import { UserSex } from "../../enums/EntityEnums";
import { IsEmail, IsEnum, MaxLength } from "class-validator";

@InputType()
export class SignUpCreateInput {
    @Field()
    @MaxLength(50)
    firstName: string;

    @Field()
    @MaxLength(50)
    lastName: string;

    @Field()
    @IsEmail()
    @MaxLength(100)
    email: string;

    @Field()
    @IsEnum(UserSex)
    sex: UserSex
}
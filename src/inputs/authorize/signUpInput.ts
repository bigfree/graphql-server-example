import { Field, InputType } from "type-graphql";
import { UserSex } from "../../enums/UserSexEnums";
import { IsEmail, IsEnum, IsNotEmpty, MaxLength } from "class-validator";

@InputType()
export class SignUpInput {
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
    @IsNotEmpty()
    password: string;

    @Field(() => UserSex)
    @IsEnum(UserSex)
    sex: UserSex
}
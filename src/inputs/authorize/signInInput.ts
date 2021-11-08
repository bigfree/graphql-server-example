import { Field, InputType } from "type-graphql";
import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

@InputType()
export class SignInInput {
    @Field()
    @IsEmail()
    @MaxLength(100)
    email: string;

    @Field()
    @IsNotEmpty()
    password: string;
}
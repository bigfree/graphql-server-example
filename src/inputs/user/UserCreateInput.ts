import { Field, InputType } from "type-graphql";
import { IsEmail } from "class-validator";

@InputType()
export class UserCreateInput {
    @Field()
    name: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    age: number;
}
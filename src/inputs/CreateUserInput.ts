import { Field, InputType } from "type-graphql";
import { IsEmail } from "class-validator";

@InputType()
export class CreateUserInput {
    @Field()
    name: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    age: number;
}
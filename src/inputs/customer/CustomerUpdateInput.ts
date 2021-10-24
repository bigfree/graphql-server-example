import { Field, InputType } from "type-graphql";

@InputType()
export class CustomerUpdateInput {
    @Field()
    name: string;
}
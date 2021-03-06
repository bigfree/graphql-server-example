import { ArgsType, Field, ID } from "type-graphql";

@ArgsType()
export class CustomerWhereArgs {
    @Field(() => ID)
    id: number;

    @Field({ nullable: true })
    uuid?: string;

    @Field({ nullable: true })
    name?: string;
}
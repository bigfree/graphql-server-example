import { Field, InputType } from "type-graphql";
import { CustomerAddressInput } from "../CustomerAddressInput";

@InputType()
export class CreateCustomerInput {
    @Field()
    name: string;

    @Field(() => [CustomerAddressInput], { nullable: true })
    customerAddress: CustomerAddressInput[];
}
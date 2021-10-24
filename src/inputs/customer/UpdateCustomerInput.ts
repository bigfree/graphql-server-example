import { Field, InputType } from "type-graphql";
import { CustomerAddressInput } from "../CustomerAddressInput";

@InputType()
export class UpdateCustomerInput {
    @Field()
    name: string;
}
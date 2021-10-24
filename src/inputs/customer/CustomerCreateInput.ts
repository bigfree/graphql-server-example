import { Field, InputType } from "type-graphql";
import { CustomerAddressCreateInput } from "../customerAddress/CustomerAddressCreateInput";

@InputType()
export class CustomerCreateInput {
    @Field()
    name: string;

    @Field(() => [CustomerAddressCreateInput], { nullable: true })
    customerAddress: CustomerAddressCreateInput[];
}
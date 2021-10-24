import { Field, InputType } from "type-graphql";
import { IsBoolean, IsNumber } from "class-validator";

@InputType()
export class CustomerAddressCreateInput {
    @Field()
    group: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    street?: string;

    @Field({ nullable: true })
    streetNumber?: string;

    @Field({ nullable: true })
    @IsNumber()
    postalCode?: number;

    @Field({ nullable: true })
    city?: string;

    @Field({ nullable: true })
    state?: string;

    @Field({ nullable: true })
    @IsBoolean()
    isDefault?: boolean;
}
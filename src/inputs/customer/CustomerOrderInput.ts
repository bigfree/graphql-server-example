import { Field, InputType } from "type-graphql";
import { OrderEnum } from "../../enums/OrderDbEnum";

@InputType()
export class CustomerOrderInput {
    @Field(() => OrderEnum, { nullable: true })
    id?: OrderEnum;

    @Field(() => OrderEnum, { nullable: true })
    name?: OrderEnum;

    @Field(() => OrderEnum, { nullable: true })
    createdAt?: OrderEnum;

    @Field(() => OrderEnum, { nullable: true })
    updatedAt?: OrderEnum;

    @Field(() => OrderEnum, { nullable: true })
    deletedAt?: OrderEnum;
}
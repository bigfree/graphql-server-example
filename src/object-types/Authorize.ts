import { Field, ObjectType } from "type-graphql";
import { User } from "../entities/user/User";

@ObjectType()
export class Authorize {
    @Field()
    success: boolean;

    @Field()
    token: string;

    // TODO: create for custom errors
    @Field({ nullable: true })
    errors?: string;

    @Field({ nullable: true })
    user?: User
}
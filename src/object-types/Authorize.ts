import { Field, ObjectType } from "type-graphql";
import { User } from "../entities/user/User";

@ObjectType()
export class Authorize {
    @Field()
    success: boolean;

    @Field()
    token: string;

    @Field({ nullable: true })
    error?: string;

    @Field({ nullable: true })
    user?: User
}
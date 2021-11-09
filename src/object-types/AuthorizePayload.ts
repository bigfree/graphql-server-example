import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class AuthorizePayload {
    @Field()
    token: string;
}
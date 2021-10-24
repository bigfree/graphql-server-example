import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../../entities/User";
import { CreateUserInput } from "../../inputs/CreateUserInput";

@Resolver(() => User)
export class UserResolver {

    @Query(() => [User])
    async users(): Promise<User[]> {
        return await User.find();
    }

    @Mutation(() => User)
    async createUser(@Arg("data") data: CreateUserInput): Promise<User> {
        const user = User.create(data);
        await user.save();
        return user;
    }
}
import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/user/User";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { Authorize } from "../../object-types/Authorize";
import { SignUpCreateInput } from "../../inputs/authorize/signUpCreateInput";

@Resolver(() => Authorize)
export class AuthorizeResolver {
    /**
     * AuthorizeResolver constructor
     * @param userRepository
     */
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
    }

    @Mutation(() => Authorize)
    async signUp(@Arg("data") signUpUserData: SignUpCreateInput): Promise<Authorize> {
        let returnObject: Authorize = {
            "success": false,
            "token": ""
        };

        try {
            const user = this.userRepository.create(signUpUserData);
            const newUser = await this.userRepository.save(user);

            returnObject = {...returnObject, ...{
                "success": true,
                "user": newUser,
            }};
        } catch (e: Error) {
            returnObject = {...returnObject, error: e.message};
        }

        return returnObject;
    }
}
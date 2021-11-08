import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/user/User";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { Authorize } from "../../object-types/Authorize";
import { SignUpInput } from "../../inputs/authorize/signUpInput";
import { UserPassword } from "../../models/UserPassword";
import { Inject } from "typedi";
import { SignInInput } from "../../inputs/authorize/signInInput";

@Resolver(() => Authorize)
export class AuthorizeResolver {
    /**
     * AuthorizeResolver constructor
     * @param userRepository
     * @param userPassword
     */
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @Inject()
        private readonly userPassword: UserPassword
    ) {
    }

    /**
     * SignUp Mutator
     * @param signUpUserData
     */
    @Mutation(() => Authorize)
    async signUp(@Arg("data") signUpUserData: SignUpInput): Promise<Authorize> {
        let returnObject: Authorize = {
            "success": false,
            "token": ""
        };

        try {
            const user = this.userRepository.create(signUpUserData);
            user.password = await this.userPassword.hashPassword(signUpUserData.password);

            const newUser = await this.userRepository.save(user);

            // TODO: create custom error
            returnObject = {
                ...returnObject, ...{
                    "success": true,
                    "user": newUser,
                }
            };
        } catch (e: unknown) {
            // TODO: rewrite to custom error
            returnObject = { ...returnObject, errors: e as string };
        }

        return returnObject;
    }

    /**
     * SignIn Mutator
     * @param signInUserData
     */
    @Mutation(() => Authorize)
    async signIn(@Arg("data") { email, password }: SignInInput): Promise<Authorize> {
        let returnObject: Authorize = {
            "success": false,
            "token": ""
        };

        try {
            const user = await this.userRepository.findOneOrFail({
                where: {
                    email
                }
            });

            const comparePassword = await this.userPassword.comparePassword(password, user.password);

            if (!user || !comparePassword) {
                // TODO: create custom error
            } else {
                returnObject = {
                    ...returnObject, ...{
                        "success": true,
                        "user": user,
                    }
                };
            }
        } catch (e: unknown) {
            // TODO: rewrite to custom error
            returnObject = { ...returnObject, errors: e as string };
        }

        return returnObject;
    }
}
import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/user/User";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { AuthorizePayload } from "../../object-types/AuthorizePayload";
import { SignUpInput } from "../../inputs/authorize/signUpInput";
import { PasswordService } from "../../models/PasswordService/PasswordService";
import { Inject } from "typedi";
import { JsonWebTokenService } from "../../models/JsonWebTokenService/JsonWebTokenService";
import { SignInInput } from "../../inputs/authorize/signInInput";

@Resolver(() => AuthorizePayload)
export class AuthorizeResolver {
    /**
     * AuthorizeResolver constructor
     * @param userRepository
     * @param passwordService
     * @param jwtService
     */
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @Inject()
        private readonly passwordService: PasswordService,
        @Inject()
        private readonly jwtService: JsonWebTokenService,
    ) {
    }

    /**
     * SignUp Mutator
     * @param signUpUserData
     */
    @Mutation(() => AuthorizePayload)
    async signUp(@Arg("data") signUpUserData: SignUpInput): Promise<AuthorizePayload> {
        try {
            // Create new user object
            const user = this.userRepository.create(signUpUserData);
            user.password = await this.passwordService.hashPassword(signUpUserData.password);

            // Save new user
            const newUser = await this.userRepository.save(user);

            // Generate jwt user token
            const token = await this.jwtService.signToken({
                id: newUser.id,
                email: newUser.email
            });

            // TODO: create custom error
            return { token };
        } catch (error: unknown) {
            // if (error instanceof QueryFailedError) {
            //     // throw new ApolloError(error.code);
            // }
            // TODO: rewrite to custom error
            // return { token: "" };
        }
    }

    /**
     * SignIn Mutator
     * @param signInUserData
     */
    @Mutation(() => AuthorizePayload)
    async signIn(@Arg("data") { email, password }: SignInInput): Promise<AuthorizePayload> {
        try {
            // Fetch user from database
            const user = await this.userRepository.findOneOrFail({
                where: {
                    email
                }
            });

            // Compare password in database
            const comparePassword = await this.passwordService.comparePassword(password, user.password);

            // TODO: rewrite to custom error
            if (!comparePassword) {
                return null;
            }

            // Generate jwt user token
            const token = await this.jwtService.signToken({
                id: user.id,
                email: user.email
            });

            return { token };
        } catch (error: unknown) {
            // TODO: rewrite to custom error
        }
    }
}
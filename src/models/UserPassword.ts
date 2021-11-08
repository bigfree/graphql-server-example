import { compare, genSalt, hash } from "bcrypt"
import { Service } from "typedi";

/**
 * UserPassword service
 */
@Service()
export class UserPassword {
    saltRounds: number;

    constructor() {
        this.saltRounds = 10;
    }

    /**
     * Create user password and salt
     * @param password
     */
    public async hashPassword(password: string): Promise<string> {
        const generatedSalt: string = await genSalt(this.saltRounds);
        return await hash(password, generatedSalt);
    }

    /**
     * Compare user password
     * @param password
     * @param hashPassword
     */
    public async comparePassword(password: string, hashPassword: string): Promise<boolean> {
        return await compare(password, hashPassword);
    }
}
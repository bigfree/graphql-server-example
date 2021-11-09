import { compare, genSalt, hash } from "bcrypt"
import { Service } from "typedi";
import { PasswordServiceInterface } from "./PasswordServiceInterface";

@Service()
export class PasswordService implements PasswordServiceInterface {
    readonly saltRounds: number;

    constructor() {
        this.saltRounds = 10;
    }

    public async hashPassword(password: string): Promise<string> {
        const generatedSalt: string = await genSalt(this.saltRounds);
        return await hash(password, generatedSalt);
    }

    public async comparePassword(password: string, hashPassword: string): Promise<boolean> {
        return await compare(password, hashPassword);
    }
}
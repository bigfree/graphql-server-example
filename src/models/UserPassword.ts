import { genSalt, hash } from "bcrypt"

type CreatePasswordType = {
    generatedSalt: string;
    generatedPassword: string;
}

export class UserPassword {
    saltRounds: number;

    constructor() {
        this.saltRounds = 10;
    }

    /**
     * Create user password and salt
     * @param password
     */
    public async createPassword(password: string): Promise<CreatePasswordType> {
        const generatedSalt = await genSalt(this.saltRounds);
        const generatedPassword = await hash(password, generatedSalt);

        return {
            generatedSalt,
            generatedPassword
        }
    }
}
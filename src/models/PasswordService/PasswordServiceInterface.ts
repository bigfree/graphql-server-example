export interface PasswordServiceInterface {

    /**
     * Define generate salt rounds
     */
    readonly saltRounds: number;

    /**
     * Hash plaintext password
     * @param password
     */
    hashPassword(password: string): Promise<string>;

    /**
     * Compare plaintext password and hashPassword
     * @param password
     * @param hashPassword
     */
    comparePassword(password: string, hashPassword: string): Promise<boolean>;
}
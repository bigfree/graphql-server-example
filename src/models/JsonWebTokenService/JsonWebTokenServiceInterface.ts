export type jwtSignObjectType = {
    id: number;
    email: string;
}

export interface JsonWebTokenServiceInterface {
    /**
     * Secret private key
     */
    readonly privateKey: string;

    /**
     * Create JWT token
     * @param signObject
     */
    signToken(signObject: jwtSignObjectType): Promise<string|null>;

    /**
     * Verify JWT token
     * @param token
     */
    verifyToken(token: string): Promise<jwtSignObjectType>;
}
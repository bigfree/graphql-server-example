import { Service } from "typedi";
import { JsonWebTokenServiceInterface, jwtSignObjectType } from "./JsonWebTokenServiceInterface";
import { sign, SignOptions } from "jsonwebtoken";

@Service()
export class JsonWebTokenService implements JsonWebTokenServiceInterface {
    readonly privateKey: string;

    constructor() {
        this.privateKey = process.env.JWT_SECRET;
    }

    public async signToken(jwtObject: jwtSignObjectType): Promise<string | null> {
        const signOptions: SignOptions = {
            expiresIn: '1h',
            algorithm: 'HS512',
        }

        return new Promise<string | null>((resolve, reject) => {
            return sign(jwtObject, this.privateKey, signOptions, (error: Error | null, token: string | undefined) => {
                if (error) {
                    reject(null);
                } else {
                    resolve(token);
                }
            });
        });
    }

    verifyToken(token: string): Promise<jwtSignObjectType> {
        return Promise.resolve(undefined);
    }
}
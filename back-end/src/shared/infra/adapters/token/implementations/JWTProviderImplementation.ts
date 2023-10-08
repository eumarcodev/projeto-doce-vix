import { sign } from "jsonwebtoken";
import { IJWTProvider } from "../IJWTProvider";

export class JWTProviderImplementation implements IJWTProvider {
    private readonly JWTsalt: string;

    constructor() {
        this.JWTsalt = String(process.env.JWT_SALT);
    }

    async generateToken(userId: string, JWTsalt: jwtsalt): Promise<string> {
        return sign(userId, jwtSalt, { expiresIn: "1d" });
    }
}

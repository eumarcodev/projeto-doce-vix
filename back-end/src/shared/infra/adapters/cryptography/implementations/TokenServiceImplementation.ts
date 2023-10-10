import { sign } from "jsonwebtoken";
import { ITokenProvider } from "../ITokenProvider";

export class JwtTokenProvider implements ITokenProvider {
    async generateToken(
        userId: number,
        expiresIn: string | number,
    ): Promise<string> {
        const user = { subject: userId };
        return sign(user, String(process.env.JWT_SALT), { expiresIn });
    }
}

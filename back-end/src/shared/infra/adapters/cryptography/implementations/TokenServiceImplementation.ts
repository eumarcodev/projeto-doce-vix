import { sign } from "jsonwebtoken";
import { ITokenProvider } from "../ITokenProvider";
import { ITokenProviderPayload } from "../ITokenProviderPayload";

export class JwtTokenProvider implements ITokenProvider {
    async generateToken(
        payload: ITokenProviderPayload,
        expiresIn: string | number,
    ): Promise<string> {
        return sign(payload, String(process.env.JWT_SALT), { expiresIn });
    }
}

import { ITokenProviderPayload } from "./ITokenProviderPayload";

export interface ITokenProvider {
    generateToken(
        payload: ITokenProviderPayload,
        expiresIn: string | number,
    ): Promise<string>;
}

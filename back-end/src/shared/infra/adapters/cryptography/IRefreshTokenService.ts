import { IRefreshToken } from "@/modules/users/model/IRefreshToken";

export interface IRefreshTokenService {
    generateRefreshToken(userId: number): Promise<IRefreshToken>;
}

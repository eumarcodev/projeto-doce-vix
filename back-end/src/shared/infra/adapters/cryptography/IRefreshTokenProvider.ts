import { IRefreshToken } from "@/modules/users/model/IRefreshToken";

export interface IRefreshTokenPRovider {
    generateRefreshToken(userId: number): Promise<IRefreshToken>;
}

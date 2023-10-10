import { IRefreshToken } from "../model/IRefreshToken";

interface ISaveRefreshTokenDTO {
    userId: number;
    expireIn: number;
}

interface IRefreshTokenRepository {
    findById(id: number): Promise<IRefreshToken | undefined>;
    findByUserId(userId: number): Promise<IRefreshToken | undefined>;
    save({
        userId,
        expireIn,
    }: ISaveRefreshTokenDTO): Promise<IRefreshToken | undefined>;
}

export { IRefreshTokenRepository, ISaveRefreshTokenDTO };

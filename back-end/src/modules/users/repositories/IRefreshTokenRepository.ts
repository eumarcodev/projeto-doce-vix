import { IRefreshToken } from "../model/IRefreshToken";

interface ISaveRefreshTokenDTO {
    userId: number;
    expireIn: Date;
}

interface IRefreshTokenRepository {
    findById(id: number): Promise<IRefreshToken | undefined>;
    findByUserId(userId: number): Promise<IRefreshToken | undefined>;
    save({
        userId,
        expireIn,
    }: ISaveRefreshTokenDTO): Promise<IRefreshToken | undefined>;
    deleteAll(userId: number): Promise<void>;
}

export { IRefreshTokenRepository, ISaveRefreshTokenDTO };

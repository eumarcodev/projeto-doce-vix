import { IRefreshToken } from "../model/IRefreshToken";

interface ISaveRefreshTokenDTO {
    role: string;
    userId: string;
    expireIn: Date;
}

interface IRefreshTokenRepository {
    findById(id: string): Promise<IRefreshToken | undefined>;
    findByUserId(userId: string): Promise<IRefreshToken | undefined>;
    save({
        userId,
        expireIn,
        role,
    }: ISaveRefreshTokenDTO): Promise<IRefreshToken | undefined>;
    deleteAll(userId: string): Promise<void>;
}

export { IRefreshTokenRepository, ISaveRefreshTokenDTO };


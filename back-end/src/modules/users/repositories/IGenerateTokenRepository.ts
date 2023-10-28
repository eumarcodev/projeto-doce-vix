import { IGenerateToken } from "../model/IGenerateToken";

interface ISaveGenerateTokenDTO {
    token: string;
    role: string;
    userId: number;
    expireIn: Date;
}

interface IGenerateTokenRepository {
    findByUserId(userId: number): Promise<IGenerateToken | undefined>;
    save({
        token,
        userId,
        expireIn,
        role,
    }: ISaveGenerateTokenDTO): Promise<IGenerateToken | undefined>;
}

export { IGenerateTokenRepository, ISaveGenerateTokenDTO };


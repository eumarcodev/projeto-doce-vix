import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { IService } from "@/shared/infra/protocols/IService";
import { IRefreshToken } from "../../model/IRefreshToken";
import {
    IRefreshTokenRepository,
    ISaveRefreshTokenDTO,
} from "../../repositories/IRefreshTokenRepository";

export class GenerateRefreshTokenService
    implements IService<ISaveRefreshTokenDTO, IRefreshToken>
{
    constructor(private readonly repository: IRefreshTokenRepository) { }

    async execute({
        userId,
        expireIn,
        role,
    }: ISaveRefreshTokenDTO): Promise<IRefreshToken> {
        const token = await this.repository.save({
            userId,
            expireIn,
            role,
        });

        if (!token)
            throw new ErrorHandler(
                "Error on save token",
                HttpStatusCode.BAD_REQUEST,
            );

        return token;
    }
}

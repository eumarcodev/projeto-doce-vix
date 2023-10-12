import { IService } from "@/shared/infra/protocols/IService";
import {
    IRefreshTokenRepository,
    ISaveRefreshTokenDTO,
} from "../../repositories/IRefreshTokenRepository";
import { IRefreshToken } from "../../model/IRefreshToken";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";

export class GenerateRefreshTokenService
    implements IService<ISaveRefreshTokenDTO, IRefreshToken>
{
    constructor(private readonly repository: IRefreshTokenRepository) {}

    async execute({
        userId,
        expireIn,
    }: ISaveRefreshTokenDTO): Promise<IRefreshToken> {
        const token = await this.repository.save({
            userId,
            expireIn,
        });

        if (!token)
            throw new ErrorHandler(
                "Error on save token",
                HttpStatusCode.BAD_REQUEST,
            );

        return token;
    }
}

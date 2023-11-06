import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { IService } from "@/shared/infra/protocols/IService";

import { IGenerateToken } from "../../model/IGenerateToken";
import {
    IGenerateTokenRepository,
    ISaveGenerateTokenDTO
} from "../../repositories/IGenerateTokenRepository";

export class GenerateRefreshTokenService
    implements IService<ISaveGenerateTokenDTO, IGenerateToken>
{
    constructor(private readonly repository: IGenerateTokenRepository) { }

    async execute({
        token,
        role,
        userId,
        expireIn,
    }: ISaveGenerateTokenDTO): Promise<IGenerateToken> {
        const Createtoken = await this.repository.save({
            token,
            role,
            userId,
            expireIn,
        });

        if (!Createtoken)
            throw new ErrorHandler(
                "Error on save token",
                HttpStatusCode.BAD_REQUEST,
            );

        return Createtoken;
    }
}

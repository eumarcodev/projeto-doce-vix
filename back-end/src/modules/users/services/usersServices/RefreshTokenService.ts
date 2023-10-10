import { IService } from "@/shared/infra/protocols/IService";
import { IRefreshTokenRepository } from "../../repositories/IRefreshTokenRepository";
import { IRefreshToken } from "../../model/IRefreshToken";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ITokenProvider } from "@/shared/infra/adapters/cryptography/ITokenProvider";

export class RefreshTokenService implements IService<number, string> {
    constructor(
        private readonly repository: IRefreshTokenRepository,
        private readonly tokenProvider: ITokenProvider,
    ) {}

    async execute(id: number): Promise<string> {
        const refreshToken = await this.repository.findById(id);

        if (!refreshToken) {
            throw new ErrorHandler(
                "refresh token invalid",
                HttpStatusCode.UNAUTHORIZED,
            );
        }

        const token = await this.tokenProvider.generateToken(
            refreshToken.id,
            "10s",
        );

        return token;
    }
}

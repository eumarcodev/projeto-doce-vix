import dayjs from "dayjs";

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { ITokenProvider } from "@/shared/infra/adapters/cryptography/ITokenProvider";
import { IService } from "@/shared/infra/protocols/IService";

import { IRefreshToken } from "../../model/IRefreshToken";
import { IRefreshTokenRepository } from "../../repositories/IRefreshTokenRepository";

export class RefreshTokenService
    implements
        IService<number, { token: string; refreshToken?: IRefreshToken }>
{
    constructor(
        private readonly repository: IRefreshTokenRepository,
        private readonly tokenProvider: ITokenProvider,
    ) {}

    async execute(
        userId: number,
    ): Promise<{ token: string; refreshToken?: IRefreshToken }> {
        const refreshToken = await this.repository.findByUserId(userId);

        if (!refreshToken) {
            throw new ErrorHandler(
                "refresh token invalid",
                HttpStatusCode.UNAUTHORIZED,
            );
        }

        const tokenPayload = {
            userId: refreshToken.userId,
            role: refreshToken.role,
        };

        const token = await this.tokenProvider.generateToken(
            tokenPayload,
            String(process.env.TOKEN_DURATION),
        );

        const refreshTokenExpired = dayjs().isAfter(
            dayjs(refreshToken.expireIn),
        );

        if (refreshTokenExpired) {
            await this.repository.deleteAll(refreshToken.userId);
            const newRefreshTokenExpireIn = dayjs()
                .add(Number(process.env.REFRESH_TOKEN_EXPIRATION), "day")
                .toDate();

            const newRefreshToken = await this.repository.save({
                userId: refreshToken.userId,
                expireIn: newRefreshTokenExpireIn,
                role: refreshToken.role,
            });

            if (!newRefreshToken)
                throw new ErrorHandler(
                    "error on generate new refresh token",
                    HttpStatusCode.UNAUTHORIZED,
                );

            return { token, refreshToken: newRefreshToken };
        }

        return { token };
    }
}

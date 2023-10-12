import { IService } from "@/shared/infra/protocols/IService";
import { IRefreshTokenRepository } from "../../repositories/IRefreshTokenRepository";
import dayjs from "dayjs";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ITokenProvider } from "@/shared/infra/adapters/cryptography/ITokenProvider";
import { IRefreshToken } from "../../model/IRefreshToken";

export class RefreshTokenService implements IService<number, { token: string; refreshToken?: IRefreshToken }> {
    constructor(
        private readonly repository: IRefreshTokenRepository,
        private readonly tokenProvider: ITokenProvider,
    ) {}

    async execute(userId: number): Promise<{ token: string; refreshToken?: IRefreshToken }> {
        const refreshToken = await this.repository.findByUserId(userId)
        
        if (!refreshToken) {
            throw new ErrorHandler(
                "refresh token invalid",
                HttpStatusCode.UNAUTHORIZED,
                );
            }
            
            const token = await this.tokenProvider.generateToken(
                refreshToken.userId,
                "10d",
            );

            const refreshTokenExpired = dayjs().isAfter(dayjs(refreshToken.expireIn));


        

        if(refreshTokenExpired) {
            await this.repository.deleteAll(refreshToken.userId)
            const newRefreshTokenExpireIn = dayjs().add(10, 'days').toDate();

            const newRefreshToken = await this.repository.save({
                userId: refreshToken.userId,
                expireIn: newRefreshTokenExpireIn

            });

            if(!newRefreshToken) throw new ErrorHandler(
                "error on generate new refresh token",
                HttpStatusCode.UNAUTHORIZED,
                );

            return { token, refreshToken: newRefreshToken };
        }


        return { token };
    }
}

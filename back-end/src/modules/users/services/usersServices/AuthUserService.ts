import { IService } from "@/shared/infra/protocols/IService";
import { IRefreshToken } from "../../model/IRefreshToken";
import { IRefreshTokenRepository } from "../../repositories/IRefreshTokenRepository";
import { IUserRepository } from "../../repositories/IUserRepository";

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { ITokenProvider } from "@/shared/infra/adapters/cryptography/ITokenProvider";
import dayjs from "dayjs";
import { AuthUserValidator } from "./validation/AuthUserValidator";

export interface IRequest {
    email: string;
    password: string;
}

export class AuthUserService
    implements
    IService<IRequest, { token: string; refreshToken: IRefreshToken }>
{
    constructor(
        private readonly authUserValidator: AuthUserValidator,
        private readonly repository: IUserRepository,
        private readonly refreshTokenRepository: IRefreshTokenRepository,
        private readonly tokenProvider: ITokenProvider,
    ) { }

    async execute({ email, password }: IRequest): Promise<{
        token: string;
        refreshToken: IRefreshToken;
    }> {
        await this.authUserValidator.validate({
            email,
            password,
        });

        const userExists = await this.repository.findByMail(email);

        if (!userExists)
            throw new ErrorHandler(
                "Email or Password incorrect",
                HttpStatusCode.UNAUTHORIZED,
            );


        const token = await this.tokenProvider.generateToken(
            { userId: userExists.id, role: userExists.role },
            "60s"
        );

        const expireIn = dayjs().add(Number(process.env.REFRESH_TOKEN_EXPIRATION), "day").toDate();
        const refreshToken = await this.refreshTokenRepository.save({
            userId: userExists.id,
            expireIn,
            role: userExists.role


        });

        if (!refreshToken)
            throw new ErrorHandler(
                "token invalid",
                HttpStatusCode.UNAUTHORIZED,
            );

        return { token, refreshToken };
    }
}

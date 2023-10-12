import { IService } from "@/shared/infra/protocols/IService";
import { AuthUserValidator } from "../validation/AuthUserValidator";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IRefreshTokenRepository } from "../../repositories/IRefreshTokenRepository";
import { IRefreshToken } from "../../model/IRefreshToken";

import dayjs from "dayjs";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { ITokenProvider } from "@/shared/infra/adapters/cryptography/ITokenProvider";

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
    ) {}

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
            userExists.id,
            "10d",
        );
        const expireIn = dayjs().add(14, "second").toDate();
        const refreshToken = await this.refreshTokenRepository.save({
            userId: userExists.id,
            expireIn,
        });

        if (!refreshToken)
            throw new ErrorHandler(
                "token invalid",
                HttpStatusCode.UNAUTHORIZED,
            );

        return { token, refreshToken };
    }
}

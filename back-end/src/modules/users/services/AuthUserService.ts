import { IService } from "@/shared/infra/protocols/IService";
import { AuthUserValidator, IRequest } from "./validation/AuthUserValidator";
import { IUserRepository } from "../repositories/IUserRepository";
import { sign } from "jsonwebtoken";

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";

export interface IRequest {
    email: string;
    encryptedPassword: string;
}

export class AuthUserService implements IService<IRequest, string> {
    constructor(
        private readonly authUserValidator: AuthUserValidator,
        private readonly repository: IUserRepository,
    ) {}

    async execute({ email, encryptedPassword }: IRequest): Promise<string> {
        await this.authUserValidator.validate({
            email,
            encryptedPassword,
        });

        const userExists = await this.repository.findByMail(email);

        if (!userExists)
            throw new ErrorHandler(
                "Email or Password incorrect",
                HttpStatusCode.UNAUTHORIZED,
            );

        const token = sign(
            { subject: userExists.id },
            String(process.env.JWT_SALT),
            { expiresIn: "20m" },
        );

        return token;
    }
}

import { IValidator } from "@/shared/infra/protocols/IValidator";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ICriptography } from "@/shared/infra/adapters/cryptography/ICryptography";

interface IRequest {
    email: string;
    encryptedPassword: string;
}

export class AuthUserValidator implements IValidator<IRequest> {
    constructor(
        private readonly repository: IUserRepository,
        private readonly cryptography: ICriptography,
    ) {}

    async validate(data: IRequest): Promise<void> {
        const { email, encryptedPassword } = data;

        const userExists = await this.repository.findByMail(email);

        if (!userExists)
            throw new ErrorHandler(
                "Email or Password incorrect",
                HttpStatusCode.UNAUTHORIZED,
            );

        const passwordMatch = await this.cryptography.compare(
            encryptedPassword,
            userExists.password,
        );

        if (!passwordMatch)
            throw new ErrorHandler(
                "Email or Password incorrect",
                HttpStatusCode.UNAUTHORIZED,
            );
    }
}

import { IUserRepository } from "@/modules/users/repositories/IUserRepository";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { ICriptography } from "@/shared/infra/adapters/cryptography/ICryptography";
import { IValidator } from "@/shared/infra/protocols/IValidator";

interface IRequest {
    email: string;
    password: string;
}

export class AuthUserValidator implements IValidator<IRequest> {
    constructor(
        private readonly repository: IUserRepository,
        private readonly cryptography: ICriptography,
    ) { }

    async validate(data: IRequest): Promise<void> {
        const { email, password } = data;

        const userExists = await this.repository.findByMail(email);

        if (!userExists)
            throw new ErrorHandler(
                "Email or Password incorrect",
                HttpStatusCode.UNAUTHORIZED,
            );

        const passwordMatch = await this.cryptography.compare(
            password,
            userExists.password,
        );

        if (!passwordMatch)
            throw new ErrorHandler(
                "Email or Password incorrect",
                HttpStatusCode.UNAUTHORIZED,
            );
    }
}

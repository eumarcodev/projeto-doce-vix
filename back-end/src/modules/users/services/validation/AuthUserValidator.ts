import { IValidator } from "@/shared/infra/protocols/IValidator";
import {
    IAuthenticateUserDTO,
    IUserRepository,
} from "../../repositories/IUserRepository";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ICriptography } from "@/shared/infra/adapters/cryptography/ICryptography";

export class AuthUserValidator implements IValidator<IAuthenticateUserDTO> {
    constructor(
        private readonly repository: IUserRepository,
        private readonly cryptography: ICriptography,
    ) {}

    async validate(data: IAuthenticateUserDTO): Promise<void> {
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

import { IValidator } from "@/shared/infra/protocols/IValidator";
import {
    ICreateUserDTO,
    IUserRepository,
} from "../../repositories/IUserRepository";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { passwordSchema } from "@/shared/utils/validatePassword";

export class CreateUserValidator implements IValidator<ICreateUserDTO> {
    constructor(private readonly userRepository: IUserRepository) {}

    async validate(data: ICreateUserDTO): Promise<void> {
        const { name, email, encryptedPassword } = data;

        if (!name)
            throw new ErrorHandler(
                "name is required",
                HttpStatusCode.BAD_REQUEST,
            );
        const userExists = await this.userRepository.findByMail(email);

        if (userExists)
            throw new ErrorHandler(
                "E-mail already registered",
                HttpStatusCode.CONFLICT,
            );

        if (!encryptedPassword)
            throw new ErrorHandler(
                "Password is required",
                HttpStatusCode.BAD_REQUEST,
            );

        await passwordSchema.validate(encryptedPassword);
    }
}

import {
    IUpdateUserDTO,
    IUserRepository,
} from "@/modules/users/repositories/IUserRepository";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { IValidator } from "@/shared/infra/protocols/IValidator";
import { passwordSchema } from "@/shared/utils/validatePassword";

export class UpdateUserValidator implements IValidator<IUpdateUserDTO> {
    constructor(private readonly repository: IUserRepository) {}

    async validate(data: IUpdateUserDTO): Promise<void> {
        const { guid, email, password } = data;

        if (!guid)
            throw new ErrorHandler(
                "guid is required",
                HttpStatusCode.BAD_REQUEST,
            );

        const userExists = await this.repository.findByGuid(guid);

        if (!userExists)
            throw new ErrorHandler("user not found", HttpStatusCode.NOT_FOUND);

        if (email) {
            const mailExists = await this.repository.findByMail(email);

            if (mailExists)
                throw new ErrorHandler(
                    "email is already exists",
                    HttpStatusCode.CONFLICT,
                );
        }
        if (!password)
            throw new ErrorHandler(
                "password is required",
                HttpStatusCode.BAD_REQUEST,
            );
        await passwordSchema.validate(password);
    }
}

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { ICriptography } from "@/shared/infra/adapters/cryptography/ICryptography";
import { IService } from "@/shared/infra/protocols/IService";

import { IUser } from "../../model/IUser";
import {
    IUpdateUserDTO,
    IUserRepository,
} from "../../repositories/IUserRepository";
import { UpdateUserValidator } from "./validation/UpdateUserValidator";

export class UpdateUserService implements IService<IUpdateUserDTO, IUser> {
    constructor(
        private readonly updateUserValidator: UpdateUserValidator,
        private readonly repository: IUserRepository,
        private readonly cryptography: ICriptography,
    ) {}

    async execute({
        guid,
        name,
        email,
        password,
    }: IUpdateUserDTO): Promise<IUser> {
        await this.updateUserValidator.validate({
            guid,
            email,
            password,
        });

        const encryptedpassword = await this.cryptography.encrypt(password);

        const user = await this.repository.update({
            guid,
            name,
            email,
            password: encryptedpassword,
        });

        if (!user)
            throw new ErrorHandler(
                "Error on updater user",
                HttpStatusCode.BAD_REQUEST,
            );

        return user;
    }
}

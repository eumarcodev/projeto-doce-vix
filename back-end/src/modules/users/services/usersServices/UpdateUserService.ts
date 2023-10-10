import { IService } from "@/shared/infra/protocols/IService";
import {
    IUpdateUserDTO,
    IUserRepository,
} from "../../repositories/IUserRepository";
import { IUser } from "../../model/IUser";
import { UpdateUserValidator } from "../validation/UpdateUserValidator";
import { BcryptAdapter } from "@/shared/infra/adapters/cryptography/implementations/BcryptAdapter";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ICriptography } from "@/shared/infra/adapters/cryptography/ICryptography";

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
        encryptedPassword,
    }: IUpdateUserDTO): Promise<IUser> {
        await this.updateUserValidator.validate({
            guid,
            email,
            encryptedPassword,
        });

        const encryptedpassword =
            await this.cryptography.encrypt(encryptedPassword);

        const user = await this.repository.update({
            guid,
            name,
            email,
            encryptedPassword: encryptedpassword,
        });

        if (!user)
            throw new ErrorHandler(
                "Error on updater user",
                HttpStatusCode.BAD_REQUEST,
            );

        return user;
    }
}

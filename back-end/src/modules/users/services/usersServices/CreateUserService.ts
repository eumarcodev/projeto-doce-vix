import { ICreateUserDTO } from "../../repositories/IUserRepository";
import { IService } from "@/shared/infra/protocols/IService";
import { IUser } from "../../model/IUser";
import { CreateUserValidator } from "../validation/CreateUserValidator";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ICriptography } from "@/shared/infra/adapters/cryptography/ICryptography";

export class CreateUserService implements IService<ICreateUserDTO, IUser> {
    constructor(
        private readonly createUserValidator: CreateUserValidator,
        private readonly repository: IUserRepository,
        private readonly cryptography: ICriptography,
    ) {}

    async execute({
        name,
        email,
        password,
    }: ICreateUserDTO): Promise<IUser> {
        await this.createUserValidator.validate({
            name,
            email,
            password,
        });
        const encryptedpassword =
            await this.cryptography.encrypt(password);

        const user = await this.repository.create({
            name,
            email,
            password: encryptedpassword,
        });

        if (!user)
            throw new ErrorHandler(
                "Error on create user",
                HttpStatusCode.BAD_REQUEST,
            );

        return user;
    }
}

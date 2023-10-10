import { IUseCase } from "@/shared/infra/protocols/IUseCase";
import { ICreateUserDTO } from "../../repositories/IUserRepository";
import { IUser } from "../../model/IUser";
import { CreateUserService } from "../../services/usersServices/CreateUserService";

export class CreateUserUseCase implements IUseCase<ICreateUserDTO, IUser> {
    constructor(private readonly createUserService: CreateUserService) {}

    async execute({
        name,
        email,
        encryptedPassword,
    }: ICreateUserDTO): Promise<IUser> {
        return this.createUserService.execute({
            name,
            email,
            encryptedPassword,
        });
    }
}

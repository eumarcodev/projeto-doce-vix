import { IUseCase } from "@/shared/infra/protocols/IUseCase";

import { IUser } from "../../model/IUser";
import { ICreateUserDTO } from "../../repositories/IUserRepository";
import { CreateUserService } from "../../services/usersServices/CreateUserService";

export class CreateUserUseCase implements IUseCase<ICreateUserDTO, IUser> {
    constructor(private readonly createUserService: CreateUserService) {}

    async execute({ name, email, password }: ICreateUserDTO): Promise<IUser> {
        return this.createUserService.execute({
            name,
            email,
            password,
        });
    }
}

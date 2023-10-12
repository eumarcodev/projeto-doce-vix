import { IUseCase } from "@/shared/infra/protocols/IUseCase";
import { IUpdateUserDTO } from "../../repositories/IUserRepository";
import { IUser } from "../../model/IUser";
import { UpdateUserService } from "../../services/usersServices/UpdateUserService";

export class UpdateUserUsecase implements IUseCase<IUpdateUserDTO, IUser> {
    constructor(private readonly updateUserService: UpdateUserService) {}

    async execute({
        guid,
        name,
        email,
        password,
    }: IUpdateUserDTO): Promise<IUser> {
        return this.updateUserService.execute({
            guid,
            name,
            email,
            password,
        });
    }
}

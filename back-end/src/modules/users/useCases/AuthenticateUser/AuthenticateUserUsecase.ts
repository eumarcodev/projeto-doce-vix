import { IUseCase } from "@/shared/infra/protocols/IUseCase";
import { IRequest } from "../../services/AuthUserService";
import { AuthUserService } from "../../services/AuthUserService";

export class AuthenticateUserUseCase implements IUseCase<IRequest, string> {
    constructor(private readonly authUserService: AuthUserService) {}

    async execute({ email, encryptedPassword }: IRequest): Promise<string> {
        return this.authUserService.execute({
            email,
            encryptedPassword,
        });
    }
}

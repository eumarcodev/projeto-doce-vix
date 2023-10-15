import { IUseCase } from "@/shared/infra/protocols/IUseCase";
import { IRefreshToken } from "../../model/IRefreshToken";
import {
    AuthUserService,
    IRequest,
} from "../../services/usersServices/AuthUserService";

export interface IResponse {
    token: string;
    refreshToken: IRefreshToken;
}

export class AuthenticateUserUseCase implements IUseCase<IRequest, IResponse> {
    constructor(private readonly authUserService: AuthUserService) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        return this.authUserService.execute({
            email,
            password,
        });
    }
}

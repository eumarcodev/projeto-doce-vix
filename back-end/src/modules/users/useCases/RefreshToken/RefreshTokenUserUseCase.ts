import { IUseCase } from "@/shared/infra/protocols/IUseCase";
import { RefreshTokenService } from "../../services/usersServices/RefreshTokenService";

export class RefreshTokenUserUseCase implements IUseCase<number, string> {
    constructor(private readonly refreshTokenService: RefreshTokenService) {}

    async execute(id: number): Promise<string> {
        return this.refreshTokenService.execute(id);
    }
}

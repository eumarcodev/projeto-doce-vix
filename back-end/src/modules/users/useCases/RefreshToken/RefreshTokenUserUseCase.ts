import { IUseCase } from "@/shared/infra/protocols/IUseCase";
import { IRefreshToken } from "../../model/IRefreshToken";
import { RefreshTokenService } from "../../services/tokenServices/RefreshTokenService";

export class RefreshTokenUserUseCase implements IUseCase<string, { token: string; refreshToken?: IRefreshToken }> {
    constructor(private readonly refreshTokenService: RefreshTokenService) { }

    async execute(id: string): Promise<{ token: string; refreshToken?: IRefreshToken }> {
        return this.refreshTokenService.execute(id);
    }
}

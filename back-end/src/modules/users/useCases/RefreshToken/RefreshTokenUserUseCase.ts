import { IUseCase } from "@/shared/infra/protocols/IUseCase";

import { IRefreshToken } from "../../model/IRefreshToken";
import { RefreshTokenService } from "../../services/tokenServices/RefreshTokenService";

export class RefreshTokenUserUseCase
    implements
        IUseCase<number, { token: string; refreshToken?: IRefreshToken }>
{
    constructor(private readonly refreshTokenService: RefreshTokenService) {}

    async execute(
        id: number,
    ): Promise<{ token: string; refreshToken?: IRefreshToken }> {
        return this.refreshTokenService.execute(id);
    }
}

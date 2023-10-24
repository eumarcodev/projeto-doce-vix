import { IDefaultFactory } from "@/shared/infra/factories/IDefaultFactory";
import { RefreshToken as PRefreshToken } from "@prisma/client";

import { IRefreshToken } from "../model/IRefreshToken";

export interface IRefreshTokenPrisma extends PRefreshToken {}

export class RefreshTokenPrismaFactory
    implements IDefaultFactory<IRefreshTokenPrisma, IRefreshToken>
{
    async generate(entity: IRefreshTokenPrisma): Promise<IRefreshToken> {
        const result = {
            id: entity.id,
            userId: entity.userId,
            expireIn: entity.expireIn,
            role: entity.role,
        };

        return result;
    }
}

import { IDefaultFactory } from "@/shared/infra/factories/IDefaultFactory";
import { Token as PToken } from "@prisma/client";

import { IGenerateToken } from "../model/IGenerateToken";

export interface IGenerateTokenPrisma extends PToken { }

export class GenerateTokenPrismaFactory
    implements IDefaultFactory<IGenerateTokenPrisma, IGenerateToken>
{
    async generate(entity: IGenerateTokenPrisma): Promise<IGenerateToken> {
        const result = {
            id: entity.id,
            token: entity.token,
            userId: entity.userId,
            expireIn: entity.expireIn,
            role: entity.role,
        };

        return result;
    }
}

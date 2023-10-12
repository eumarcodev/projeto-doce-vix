import { IDefaultFactory } from "@/shared/infra/factories/IDefaultFactory";
import { User as PUser } from "@prisma/client";

import { IUser } from "../model/IUser";

export interface IUserPrisma extends PUser {}

export class UserPrismaFactory implements IDefaultFactory<IUserPrisma, IUser> {
    async generate(entity: IUserPrisma): Promise<IUser> {
        const result = {
            id: entity.id,
            guid: entity.guid,
            name: entity.name,
            email: entity.email,
            password: entity.password,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };

        return result;
    }
}

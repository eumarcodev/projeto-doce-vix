import { IDefaultFactory } from "@/shared/infra/factories/IDefaultFactory";
import { Category as PCategory } from "@prisma/client";
import { ICategory } from "../model/ICategory";

export interface ICategoryPrisma extends PCategory {}

export class CategoryPrismaFactory
    implements IDefaultFactory<ICategoryPrisma, ICategory>
{
    async generate(entity: ICategoryPrisma): Promise<ICategory> {
        const result = {
            id: entity.id,
            guid: entity.guid,
            name: entity.name,
            description: entity.description,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };

        return result;
    }
}

import { IDefaultFactory } from "@/shared/infra/factories/IDefaultFactory";
import { Product as PProduct } from "@prisma/client";

import { IProduct } from "../model/IProduct";

export interface IProductPrisma extends PProduct {}

export class ProductPrismaFactory
    implements IDefaultFactory<IProductPrisma, IProduct>
{
    async generate(entity: IProductPrisma): Promise<IProduct> {
        return {
            id: entity.id,
            guid: entity.guid,
            name: entity.name,
            description: entity.description,
            price: entity.price,
            categoryId: entity.categoryId,
            dayOfWeekId: entity.dayOfWeekId || undefined,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
}

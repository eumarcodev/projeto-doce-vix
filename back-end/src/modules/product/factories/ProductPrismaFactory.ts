import { ICategory } from "@/modules/category/model/ICategory";
import { IDayOfWeek } from "@/modules/dayOfWeek/model/IDayOfWeek";
import { IDefaultFactory } from "@/shared/infra/factories/IDefaultFactory";
import { Product as PProduct } from "@prisma/client";
import { IProduct } from "../model/IProduct";

export interface IProductPrisma extends Omit<PProduct, 'category' | 'dayOfWeek'> {
    category: ICategory;
    dayOfWeek?: IDayOfWeek | null;
}



export class ProductPrismaFactory
    implements IDefaultFactory<IProductPrisma, IProduct>
{
    async generate(entity: IProductPrisma): Promise<IProduct> {
        const {
            id, guid, name, description, price, createdAt, updatedAt, category, dayOfWeek
        } = entity;
        return {
            id,
            guid,
            name,
            description,
            price,
            category: {
                id: category.id,
                guid: category.guid,
                name: category.name,
                description: category.description,
                createdAt: category.createdAt,
                updatedAt: category.updatedAt,
            },
            dayOfWeek: dayOfWeek ? {
                id: dayOfWeek.id,
                guid: dayOfWeek.guid,
                name: dayOfWeek.name,
                createdAt: dayOfWeek.createdAt,
                updatedAt: dayOfWeek.updatedAt,

            } : undefined,
            createdAt,
            updatedAt,
        };
    }
}

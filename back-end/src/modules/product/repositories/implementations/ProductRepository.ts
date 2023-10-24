import { context } from "@/shared/infra/database/Context";
import { IDefaultFactory } from "@/shared/infra/factories/IDefaultFactory";
import { PrismaClient } from "@prisma/client";

import { IProductPrisma } from "../../factories/ProductPrismaFactory";
import { IProduct } from "../../model/IProduct";
import * as I from "../IProductRepository";
import { IProductRepository } from "../IProductRepository";

class ProductPrismaRepository implements IProductRepository {
    private prismaClient: PrismaClient;

    constructor(
        private readonly productPrismaFactory: IDefaultFactory<
            IProductPrisma,
            IProduct
        >,
    ) {
        this.prismaClient = context.prisma;
    }

    async findByName(name: string): Promise<IProduct | undefined> {
        const productsP = await this.prismaClient.product.findFirst({
            where: {
                name,
            },
            include: {
                files: true,
                category: true,
                dayOfWeek: true
            }
        });

        if (!productsP) return undefined;

        return this.productPrismaFactory.generate(productsP);
    }

    async create({
        name,
        description,
        price,
        categoryName,
        dayOfWeek,
    }: I.ICreateProductDTO): Promise<IProduct | undefined> {
        const categoriesP = await this.prismaClient.category.findFirst({
            where: {
                name: categoryName,
            },
        });

        if (!categoriesP) return undefined;

        let dayOfWeekP;

        if (dayOfWeek) {
            dayOfWeekP = await this.prismaClient.dayOfWeek.findFirst({
                where: {
                    name: dayOfWeek,
                },
            });
        }

        const productP = await this.prismaClient.product.create({
            data: {
                name,
                description,
                price,
                categoryId: categoriesP.id,
                dayOfWeekId: dayOfWeekP?.id,
                createdAt: new Date(),
                updatedAt: new Date(),

            },
            include: {
                files: true,
                category: true,
                dayOfWeek: true
            }
        });

        if (!productP) return undefined;

        return this.productPrismaFactory.generate(productP);
    }

    async update({
        guid,
        name,
        description,
        categoryName,
        price,
        dayOfWeek,
    }: I.IUpdateProductDTO): Promise<IProduct | undefined> {
        const dayOfWeekP = await this.prismaClient.dayOfWeek.findFirst({
            where: {
                name: dayOfWeek,
            },
        });

        const categoryNameP = await this.prismaClient.category.findFirst({
            where: {
                name: categoryName,
            },
        });

        const productP = await this.prismaClient.product.update({
            where: {
                guid,
            },
            data: {
                name,
                price,
                description,
                categoryId: categoryNameP?.id,
                dayOfWeekId: dayOfWeekP?.id,
                updatedAt: new Date(),
            },
            include: {
                files: true,
                category: true,
                dayOfWeek: true
            }
        });

        if (!productP) return undefined;

        return this.productPrismaFactory.generate(productP);
    }

    async delete(guid: string): Promise<IProduct | undefined> {
        const productP = await this.prismaClient.product.delete({
            where: {
                guid,
            },
            include: {
                files: true,
                category: true,
                dayOfWeek: true
            }
        });

        if (!productP) return undefined;

        return this.productPrismaFactory.generate(productP);
    }

    async list({
        search,
        limit,
        offset,
    }: I.IListProductRequest): Promise<I.IListProductResponse | undefined> {
        const where = search
            ? {
                OR: [
                    {
                        name: {
                            contains: search,
                        },
                    },
                    {
                        description: {
                            contains: search,
                        },
                    },
                ],
            }
            : undefined;

        const count = await this.prismaClient.product.count({
            where,
        });

        const productsP = await this.prismaClient.product.findMany({
            where,
            take: limit,
            skip: offset,
            include: {
                files: true,
                category: true,
                dayOfWeek: true
            }
        });

        if (!productsP) return undefined;

        const products = await Promise.all(
            productsP.map(async (productP) => {
                return await this.productPrismaFactory.generate(productP);
            }),
        );

        return {
            products,
            count,
        };
    }

    async findById(id: number): Promise<IProduct | undefined> {
        const productsP = await this.prismaClient.product.findUnique({
            where: {
                id,
            },
            include: {
                files: true,
                category: true,
                dayOfWeek: true
            }
        });

        if (!productsP) return undefined;

        return this.productPrismaFactory.generate(productsP);
    }
}

export { ProductPrismaRepository };


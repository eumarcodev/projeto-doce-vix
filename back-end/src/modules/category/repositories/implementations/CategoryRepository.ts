import { context } from "@/shared/infra/database/Context";
import { IDefaultFactory } from "@/shared/infra/factories/IDefaultFactory";
import { PrismaClient } from "@prisma/client";

import { ICategoryPrisma } from "../../factories/CategoryPrismaFactory";
import { ICategory } from "../../model/ICategory";
import {
    ICategoryRepository,
    ICreateCategoryDTO,
    IListCategoryRequest,
    IListCategoryResponse,
    IUpdateCategoryDTO,
} from "../ICategoryRepository";

class CategoryPrismaRepository implements ICategoryRepository {
    private prismaClient: PrismaClient;

    constructor(
        private readonly categoryPrismaFactory: IDefaultFactory<
            ICategoryPrisma,
            ICategory
        >,
    ) {
        this.prismaClient = context.prisma;
    }

    async findByName(name: string): Promise<ICategory | undefined> {
        const categoriesP = await this.prismaClient.category.findFirst({
            where: {
                name,
            },
        });

        if (!categoriesP) return undefined;

        return this.categoryPrismaFactory.generate(categoriesP);
    }

    async create({
        name,
        description,
    }: ICreateCategoryDTO): Promise<ICategory | undefined> {
        const categoryP = await this.prismaClient.category.create({
            data: {
                name,
                description,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });

        if (!categoryP) return undefined;

        return this.categoryPrismaFactory.generate(categoryP);
    }

    async update({
        guid,
        name,
        description,
    }: IUpdateCategoryDTO): Promise<ICategory | undefined> {
        const categoryP = await this.prismaClient.category.update({
            where: {
                guid,
            },
            data: {
                name,
                description,
                updatedAt: new Date(),
            },
        });

        if (!categoryP) return undefined;

        return this.categoryPrismaFactory.generate(categoryP);
    }

    async delete(guid: string): Promise<ICategory | undefined> {
        const categoriesP = await this.prismaClient.category.delete({
            where: {
                guid,
            },
        });

        if (!categoriesP) return undefined;

        return this.categoryPrismaFactory.generate(categoriesP);
    }

    async list({
        search,
        limit,
        offset,
    }: IListCategoryRequest): Promise<IListCategoryResponse | undefined> {
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
                    }
                ],
            }
            : undefined;

        const count = await this.prismaClient.category.count({
            where,
        });

        const categoriesP = await this.prismaClient.category.findMany({
            where,
            take: limit,
            skip: offset,
        });

        if (!categoriesP) return undefined;

        const categories = await Promise.all(
            categoriesP.map(async (categoryP) => {
                return this.categoryPrismaFactory.generate(categoryP);
            }),
        );

        return {
            categories,
            count,
        };
    }

    async findByGuid(guid: string): Promise<ICategory | undefined> {
        const categoriesP = await this.prismaClient.category.findUnique({
            where: {
                guid,
            },
        });

        if (!categoriesP) return undefined;

        return this.categoryPrismaFactory.generate(categoriesP);
    }
}

export { CategoryPrismaRepository };


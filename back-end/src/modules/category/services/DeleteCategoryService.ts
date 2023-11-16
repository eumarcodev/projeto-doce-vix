import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { IService } from "@/shared/infra/protocols/IService";

import { ICategory } from "../model/ICategory";
import { ICategoryRepository } from "../repositories/ICategoryRepository";

export class DeleteCategoryService implements IService<string, ICategory> {
    constructor(private readonly repository: ICategoryRepository) {}
    async execute(guid: string): Promise<ICategory> {
        const categoryExists = await this.repository.findByGuid(guid);

        if (!categoryExists) {
            throw new ErrorHandler(
                "Category not found",
                HttpStatusCode.NOT_FOUND,
            );
        }

        await this.repository.delete(categoryExists.guid);

        return categoryExists;
    }
}

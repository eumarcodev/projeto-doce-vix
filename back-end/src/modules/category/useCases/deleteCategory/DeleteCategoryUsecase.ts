import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { IUseCase } from "@/shared/infra/protocols/IUseCase";

import { ICategory } from "../../model/ICategory";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";

interface IRequest {
    guid: string;
}

export class DeleteCategoryUseCase implements IUseCase<IRequest, ICategory> {
    constructor(private readonly repository: ICategoryRepository) {}

    async execute({ guid }: IRequest): Promise<ICategory> {
        const category = await this.repository.findByGuid(guid);

        if (!category)
            throw new ErrorHandler(
                "Category not found",
                HttpStatusCode.NOT_FOUND,
            );

        await this.repository.delete(guid);

        return category;
    }
}

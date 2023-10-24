import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { IUseCase } from "@/shared/infra/protocols/IUseCase";

import { ICategory } from "../../model/ICategory";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";

interface IRequest {
    name: string;
}
export class CheckCategoryExistsUseCase
    implements IUseCase<IRequest, ICategory>
{
    constructor(private readonly repository: ICategoryRepository) {}

    async execute({ name }: IRequest): Promise<ICategory> {
        const category = await this.repository.findByName(name);

        if (!category)
            throw new ErrorHandler(
                "Category not found",
                HttpStatusCode.NOT_FOUND,
            );

        return category;
    }
}

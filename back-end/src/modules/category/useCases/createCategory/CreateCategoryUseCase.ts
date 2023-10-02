import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { IUseCase } from "@/shared/infra/protocols/IUseCase";

import { ICategory } from "../../model/ICategory";
import {
    ICategoryRepository,
    ICreateCategoryDTO,
} from "../../repositories/ICategoryRepository";
import { CreateCategoryValidator } from "../../services/validation/CreateCategoryValidate";

export class CreateCategoryUseCase
    implements IUseCase<ICreateCategoryDTO, ICategory>
{
    constructor(
        private readonly repository: ICategoryRepository,
        private readonly createCategoryService: CreateCategoryValidator,
    ) {}

    async execute(data: ICreateCategoryDTO): Promise<ICategory> {
        await this.createCategoryService.validate(data);

        const category = await this.repository.create(data);

        if (!category)
            throw new ErrorHandler(
                "Error on create category",
                HttpStatusCode.BAD_REQUEST,
            );

        return category;
    }
}


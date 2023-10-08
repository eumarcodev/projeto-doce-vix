import { IUseCase } from "@/shared/infra/protocols/IUseCase";

import { ICategory } from "../../model/ICategory";
import { ICreateCategoryDTO } from "../../repositories/ICategoryRepository";
import { CreateCategoryService } from "../../services/CreateCategoryService";

export class CreateCategoryUseCase
    implements IUseCase<ICreateCategoryDTO, ICategory>
{
    constructor(
        private readonly createCategoryService: CreateCategoryService,
    ) {}

    async execute({
        name,
        description,
    }: ICreateCategoryDTO): Promise<ICategory> {
        return this.createCategoryService.execute({
            name,
            description,
        });
    }
}

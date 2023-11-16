import { IUseCase } from "@/shared/infra/protocols/IUseCase";

import { ICategory } from "../../model/ICategory";
import { IUpdateCategoryDTO } from "../../repositories/ICategoryRepository";
import { UpdateCategoryService } from "../../services/UpdateCategoryService";

export class UpdateCategoryUseCase
    implements IUseCase<IUpdateCategoryDTO, ICategory>
{
    constructor(
        private readonly updateCategoryService: UpdateCategoryService,
    ) {}

    async execute({
        guid,
        name,
        description,
    }: IUpdateCategoryDTO): Promise<ICategory> {
        return this.updateCategoryService.execute({
            guid,
            name,
            description,
        });
    }
}

import { IUseCase } from "@/shared/infra/protocols/IUseCase";
import {
    ICategoryRepository,
    IUpdateCategoryDTO,
} from "../../repositories/ICategoryRepository";
import { ICategory } from "../../model/ICategory";
import { UpdateCategoryService } from "../../services/validation/UpdateCategoryService";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";

export class UpdateCategoryUseCase
    implements IUseCase<IUpdateCategoryDTO, ICategory>
{
    constructor(
        private readonly repository: ICategoryRepository,
        private readonly updateCategoryService: UpdateCategoryService,
    ) {}

    async execute(data: IUpdateCategoryDTO): Promise<ICategory> {
        await this.updateCategoryService.validate(data);

        const category = await this.repository.update(data);

        if (!category)
            throw new ErrorHandler(
                "Error on update category",
                HttpStatusCode.BAD_REQUEST,
            );

        return category;
    }
}

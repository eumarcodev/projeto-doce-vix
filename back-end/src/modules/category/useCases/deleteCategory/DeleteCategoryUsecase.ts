import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { IUseCase } from "@/shared/infra/protocols/IUseCase";
import { IRequest } from "../../services/validation/DeleteCategoryService";
import { ICategory } from "../../model/ICategory";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";
import { DeleteProductService } from "../../services/validation/DeleteCategoryService";

export class DeleteCategoryUseCase implements IUseCase<IRequest, ICategory> {
    constructor(
        private readonly repository: ICategoryRepository,
        private readonly deleteCategoryService: DeleteProductService,
    ) {}

    async execute(data: IRequest): Promise<ICategory> {
        await this.deleteCategoryService.validate(data);

        const category = await this.repository.delete(data.guid);

        if (!category)
            throw new ErrorHandler(
                "Category not found",
                HttpStatusCode.NOT_FOUND,
            );

        return category;
    }
}

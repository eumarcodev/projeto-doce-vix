import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { IUseCase } from "@/shared/infra/protocols/IUseCase";
import { ICategory } from "../../model/ICategory";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";
import { DeleteCategoryService } from "../../services/DeleteCategoryService";

export class DeleteCategoryUseCase implements IUseCase<string, ICategory> {
    constructor(
        private readonly repository: ICategoryRepository,
        private readonly deleteCategoryService: DeleteCategoryService,
    ) {}

    async execute(data: string): Promise<ICategory> {
        return await this.deleteCategoryService.execute(data);
    }
}


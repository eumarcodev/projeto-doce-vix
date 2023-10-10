import { IUseCase } from "@/shared/infra/protocols/IUseCase";
import { ICategory } from "../../model/ICategory";
import { DeleteCategoryService } from "../../services/DeleteCategoryService";

export class DeleteCategoryUseCase implements IUseCase<string, ICategory> {
    constructor(
        private readonly deleteCategoryService: DeleteCategoryService,
    ) {}

    async execute(data: string): Promise<ICategory> {
        return this.deleteCategoryService.execute(data);
    }
}

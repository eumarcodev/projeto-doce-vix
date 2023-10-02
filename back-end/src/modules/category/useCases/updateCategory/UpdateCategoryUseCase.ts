import { IUseCase } from "@/shared/infra/protocols/IUseCase";
import {
    ICategoryRepository,
    IUpdateCategoryDTO,
} from "../../repositories/ICategoryRepository";
import { ICategory } from "../../model/ICategory";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { UpdateCategoryService } from "../../services/UpdateCategoryService";

export class UpdateCategoryUseCase
    implements IUseCase<IUpdateCategoryDTO, ICategory>
{
    constructor(
        private readonly updateCategoryService: UpdateCategoryService,
    ) {}

    async execute(data: IUpdateCategoryDTO): Promise<ICategory> {
        const { guid, name, description } = data;
        return await this.updateCategoryService.execute({
            guid,
            name,
            description,
        });
    }
}


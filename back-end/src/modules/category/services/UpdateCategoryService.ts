import { IService } from "@/shared/infra/protocols/IService";
import { ICategory } from "../model/ICategory";
import {
    ICategoryRepository,
    IUpdateCategoryDTO,
} from "../repositories/ICategoryRepository";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { UpdateCategoryValidator } from "./validation/UpdateCategoryValidate";

export class UpdateCategoryService
    implements IService<IUpdateCategoryDTO, ICategory>
{
    constructor(
        private readonly repository: ICategoryRepository,
        private readonly updateCategoryService: UpdateCategoryValidator,
    ) {}
    async execute({
        guid,
        name,
        description,
    }: IUpdateCategoryDTO): Promise<ICategory> {
        await this.updateCategoryService.validate({
            guid,
            name,
            description,
        });

        const category = await this.repository.update({
            guid,
            name,
            description,
        });

        if (!category)
            throw new ErrorHandler(
                "Error on update product",
                HttpStatusCode.BAD_REQUEST,
            );

        return category;
    }
}

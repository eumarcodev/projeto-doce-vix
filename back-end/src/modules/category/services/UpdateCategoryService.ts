import { IService } from "@/shared/infra/protocols/IService";
import { ICategory } from "../model/ICategory";
import {
    ICategoryRepository,
    IUpdateCategoryDTO,
} from "../repositories/ICategoryRepository";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { CreateProductValidator } from "@/modules/product/services/validation/CreateProductValidator";
import { CreateCategoryValidator } from "./validation/CreateCategoryValidate";

export class UpdateCategoryService
    implements IService<IUpdateCategoryDTO, ICategory>
{
    constructor(private readonly repository: ICategoryRepository) {}
    async execute({
        guid,
        name,
        description,
    }: IUpdateCategoryDTO): Promise<ICategory> {
        const categoryExists = await this.repository.findByGuid(guid);

        if (!categoryExists)
            throw new ErrorHandler(
                "Category not found",
                HttpStatusCode.NOT_FOUND,
            );

        const categoryExistsByName = await this.repository.findByName(name);

        if (categoryExistsByName)
            throw new ErrorHandler(
                "Category already exists",
                HttpStatusCode.CONFLICT,
            );

        const newCategory = await this.repository.update({
            guid,
            name,
            description,
        });

        if (!newCategory)
            throw new ErrorHandler(
                "Error on update category",
                HttpStatusCode.BAD_REQUEST,
            );

        return newCategory;
    }
}


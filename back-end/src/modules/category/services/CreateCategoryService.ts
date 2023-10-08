import { IService } from "@/shared/infra/protocols/IService";
import {
    ICategoryRepository,
    ICreateCategoryDTO,
} from "../repositories/ICategoryRepository";
import { ICategory } from "../model/ICategory";
import { CreateCategoryValidator } from "./validation/CreateCategoryValidate";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";

export class CreateCategoryService
    implements IService<ICreateCategoryDTO, ICategory>
{
    constructor(
        private readonly categoryRepository: ICategoryRepository,
        private readonly createCategoryValidator: CreateCategoryValidator,
    ) {}

    async execute({
        name,
        description,
    }: ICreateCategoryDTO): Promise<ICategory> {
        await this.createCategoryValidator.validate({
            name,
            description,
        });

        const category = await this.categoryRepository.create({
            name,
            description,
        });

        if (!category)
            throw new ErrorHandler(
                "Error on create product",
                HttpStatusCode.BAD_REQUEST,
            );

        return category;
    }
}

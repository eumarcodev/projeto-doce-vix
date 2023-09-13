import { IUseCase } from "@/shared/infra/protocols/IUseCase";
import { ICategory } from "../../model/ICategory";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";

interface IRequest {
    name: string;
    description: string;
}

export class CreateCategoryUseCase implements IUseCase<IRequest, ICategory> {
    constructor(private readonly repository: ICategoryRepository) {}

    async execute({ name, description }: IRequest): Promise<ICategory> {
        const categoryExists = await this.repository.findByName(name);

        if (categoryExists)
            throw new ErrorHandler(
                "Category already exists",
                HttpStatusCode.CONFLICT,
            );

        const category = await this.repository.create({
            name,
            description,
        });

        if (!category)
            throw new ErrorHandler(
                "Error on create category",
                HttpStatusCode.BAD_REQUEST,
            );

        return category;
    }
}


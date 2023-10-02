import { IValidator } from "@/shared/infra/protocols/IServices";
import {
    ICategoryRepository,
    ICreateCategoryDTO,
} from "../../repositories/ICategoryRepository";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";

export class CreateCategoryService implements IValidator<ICreateCategoryDTO> {
    constructor(private readonly repository: ICategoryRepository) {}

    async validate(data: ICreateCategoryDTO): Promise<void> {
        const { name } = data;

        const categoryExists = await this.repository.findByName(name);

        if (categoryExists)
            throw new ErrorHandler(
                "Category already exists",
                HttpStatusCode.CONFLICT,
            );
    }
}

import { IValidator } from "@/shared/infra/protocols/IService";
import {
    ICategoryRepository,
    IUpdateCategoryDTO,
} from "../../repositories/ICategoryRepository";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";

export class UpdateCategoryService implements IValidator<IUpdateCategoryDTO> {
    constructor(private readonly repository: ICategoryRepository) {}

    async validate(data: IUpdateCategoryDTO): Promise<void> {
        const { guid, name } = data;

        if (!guid)
            throw new ErrorHandler("Guid is required", HttpStatusCode.CONFLICT);

        const categoryExists = await this.repository.findByName(name);

        if (categoryExists)
            throw new ErrorHandler(
                "Category already exists",
                HttpStatusCode.CONFLICT,
            );
    }
}

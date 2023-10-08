import { IValidator } from "@/shared/infra/protocols/IValidator";
import {
    ICategoryRepository,
    IUpdateCategoryDTO,
} from "../../repositories/ICategoryRepository";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";

export class UpdateCategoryValidator implements IValidator<IUpdateCategoryDTO> {
    constructor(private readonly repository: ICategoryRepository) {}

    async validate(data: IUpdateCategoryDTO): Promise<void> {
        const { guid, name } = data;

        if (!guid)
            throw new ErrorHandler(
                "guid is required",
                HttpStatusCode.BAD_REQUEST,
            );

        const categoryExists = await this.repository.findByGuid(guid);

        if (!categoryExists)
            throw new ErrorHandler(
                "category not found",
                HttpStatusCode.NOT_FOUND,
            );

        if (name) {
            const categoryExistsByName = await this.repository.findByName(name);

            if (categoryExistsByName)
                throw new ErrorHandler(
                    "category  already exists",
                    HttpStatusCode.CONFLICT,
                );
        }
    }
}

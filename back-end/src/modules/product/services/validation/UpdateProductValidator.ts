import { ICategoryRepository } from "@/modules/category/repositories/ICategoryRepository";
import { IDayOfWeekRepository } from "@/modules/dayOfWeek/repositories/IDayOfWeekRepository";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { IValidator } from "@/shared/infra/protocols/IValidator";
import {
    IProductRepository,
    IUpdateProductDTO,
} from "../../repositories/IProductRepository";

export class UpdateProductValidator implements IValidator<IUpdateProductDTO> {
    constructor(
        private readonly categoryRepository: ICategoryRepository,
        private readonly productRepository: IProductRepository,
        private readonly dayOfWeekRepository: IDayOfWeekRepository,
    ) { }

    async validate(data: IUpdateProductDTO): Promise<void> {
        const { guid, name, categoryName, dayOfWeek } = data;

        if (!guid) {
            throw new ErrorHandler(
                "guid is required",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        const productExists = await this.productRepository.findByGuid(guid);

        if (!productExists)
            throw new ErrorHandler(
                "Product not found",
                HttpStatusCode.NOT_FOUND,
            );

        if (name) {
            const productExists = await this.productRepository.findByName(name);

            if (productExists)
                throw new ErrorHandler(
                    "Product already exists",
                    HttpStatusCode.CONFLICT,
                );
        }

        if (categoryName) {
            const categoryExists =
                await this.categoryRepository.findByName(categoryName);

            if (!categoryExists) {
                throw new ErrorHandler(
                    "Category not found",
                    HttpStatusCode.NOT_FOUND,
                );
            }
        }

        if (dayOfWeek) {
            const dayOfWeekExists =
                await this.dayOfWeekRepository.findByName(dayOfWeek);

            if (!dayOfWeekExists)
                throw new ErrorHandler(
                    "Day of week not found",
                    HttpStatusCode.NOT_FOUND,
                );
        }


    }
}

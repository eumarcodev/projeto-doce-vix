import { IValidator } from "@/shared/infra/protocols/IService";
import {
    ICreateProductDTO,
    IProductRepository,
} from "../../repositories/IProductRepository";
import { ICategoryRepository } from "@/modules/category/repositories/ICategoryRepository";
import { IDayOfWeekRepository } from "@/modules/dayOfWeek/repositories/IDayOfWeekRepository";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";

export class CreateProductService implements IValidator<ICreateProductDTO> {
    constructor(
        private readonly categoryRepository: ICategoryRepository,
        private readonly productRepository: IProductRepository,
        private readonly dayOfWeekRepository: IDayOfWeekRepository,
    ) {}

    async validate(data: ICreateProductDTO): Promise<void> {
        const { name, categoryName, dayOfWeek } = data;

        const categoryExists =
            await this.categoryRepository.findByName(categoryName);
        if (!categoryExists)
            throw new ErrorHandler(
                "Category not found",
                HttpStatusCode.NOT_FOUND,
            );

        if (dayOfWeek) {
            const dayOfWeekExist =
                await this.dayOfWeekRepository.findByName(dayOfWeek);
            if (!dayOfWeekExist)
                throw new ErrorHandler(
                    "Day of week not found",
                    HttpStatusCode.NOT_FOUND,
                );
        }

        const productExists = await this.productRepository.findByName(name);
        if (productExists)
            throw new ErrorHandler(
                "Product already exists",
                HttpStatusCode.CONFLICT,
            );
    }
}

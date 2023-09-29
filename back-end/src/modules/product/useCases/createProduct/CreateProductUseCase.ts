import { IUseCase } from "@/shared/infra/protocols/IUseCase";
import { IProduct } from "../../model/IProduct";
import { IProductRepository } from "../../repositories/IProductRepository";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ICreateProductDTO } from "../../repositories/IProductRepository";
import { ICategoryRepository } from "@/modules/category/repositories/ICategoryRepository";
import { IDayOfWeekRepository } from "@/modules/dayOfWeek/repositories/IDayOfWeekRepository";

export class CreateProductUseCase
    implements IUseCase<ICreateProductDTO, IProduct>
{
    constructor(
        private readonly categoryRepository: ICategoryRepository,
        private readonly dayOfWeekRepository: IDayOfWeekRepository,
        private readonly productRepository: IProductRepository,
    ) {}

    async execute({
        name,
        description,
        categoryName,
        price,
        dayOfWeek,
    }: ICreateProductDTO): Promise<IProduct> {
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
                    "Category not found",
                    HttpStatusCode.NOT_FOUND,
                );
        }

        const productExists = await this.productRepository.findByName(name);
        if (productExists)
            throw new ErrorHandler(
                "Product already exists",
                HttpStatusCode.CONFLICT,
            );

        const product = await this.productRepository.create({
            name,
            description,
            categoryName,
            price,
            dayOfWeek,
        });

        if (!product)
            throw new ErrorHandler(
                "Error on create product",
                HttpStatusCode.BAD_REQUEST,
            );

        return product;
    }
}

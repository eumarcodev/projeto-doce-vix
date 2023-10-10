import { IService } from "@/shared/infra/protocols/IService";
import {
    ICreateProductDTO,
    IProductRepository,
} from "../repositories/IProductRepository";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { CreateCategoryValidator } from "@/modules/category/services/validation/CreateCategoryValidate";
import { IProduct } from "../model/IProduct";
import { DayOfWeekCheckExistsValidator } from "@/modules/dayOfWeek/services/validation/DayOfWeekCheckExistsValidator";
import { CreateProductValidator } from "./validation/CreateProductValidator";

export class CreateProductService
    implements IService<ICreateProductDTO, IProduct>
{
    constructor(
        private readonly createCategoryValidator: CreateCategoryValidator,
        private readonly dayOfWeekCheckExists: DayOfWeekCheckExistsValidator,
        private readonly createProductValidator: CreateProductValidator,
        private readonly productRepository: IProductRepository,
    ) {}

    async execute({
        name,
        description,
        price,
        categoryName,
        dayOfWeek,
    }: ICreateProductDTO): Promise<IProduct> {
        await this.createCategoryValidator.validate({
            name: categoryName,
            description: "",
        });

        if (dayOfWeek) await this.dayOfWeekCheckExists.validate(dayOfWeek);

        await this.createProductValidator.validate({
            name,
            description,
            price,
            categoryName,
            dayOfWeek,
        });

        const product = await this.productRepository.create({
            name,
            description,
            price,
            categoryName,
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


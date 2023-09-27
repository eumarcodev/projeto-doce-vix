import { IUseCase } from "@/shared/infra/protocols/IUseCase";
import { IProduct } from "../../model/IProduct";
import { IProductRepository } from "../../repositories/IProductRepository";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ICreateProductDTO } from "../../repositories/IProductRepository";

export class CreateProductUseCase
    implements IUseCase<ICreateProductDTO, IProduct>
{
    constructor(private readonly repository: IProductRepository) {}

    async execute({
        name,
        description,
        categoryName,
        price,
        dayOfWeek,
    }: ICreateProductDTO): Promise<IProduct> {
        const productExists = await this.repository.findByName(name);
        if (productExists)
            throw new ErrorHandler(
                "Product already exists",
                HttpStatusCode.CONFLICT,
            );

        const product = await this.repository.create({
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

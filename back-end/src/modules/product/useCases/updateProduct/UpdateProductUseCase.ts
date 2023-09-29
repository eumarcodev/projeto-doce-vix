import { IUseCase } from "@/shared/infra/protocols/IUseCase";
import {
    IProductRepository,
    IUpdateProductDTO,
} from "../../repositories/IProductRepository";
import { IProduct } from "../../model/IProduct";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";

export class UpdateProductUseCase
    implements IUseCase<IUpdateProductDTO, IProduct>
{
    constructor(private readonly productRepository: IProductRepository) {}

    async execute({
        guid,
        name,
        description,
        price,
        categoryName,
        dayOfWeek,
    }: IUpdateProductDTO): Promise<IProduct> {
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

        const product = await this.productRepository.update({
            guid,
            name,
            description,
            price,
            dayOfWeek,
            categoryName,
        });

        if (!product)
            throw new ErrorHandler(
                "Error on update product",
                HttpStatusCode.BAD_REQUEST,
            );

        return product;
    }
}

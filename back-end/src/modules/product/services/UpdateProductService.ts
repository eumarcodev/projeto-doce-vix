import { IService } from "@/shared/infra/protocols/IService";
import {
    IProductRepository,
    IUpdateProductDTO,
} from "../repositories/IProductRepository";
import { IProduct } from "../model/IProduct";
import { UpdateProductValidator } from "./validation/UpdateProductValidator";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";

export class UpdateProductService
    implements IService<IUpdateProductDTO, IProduct>
{
    constructor(
        private readonly updateProductValidator: UpdateProductValidator,
        private readonly repository: IProductRepository,
    ) {}

    async execute({
        guid,
        name,
        description,
        categoryName,
        price,
        dayOfWeek,
    }: IUpdateProductDTO): Promise<IProduct> {
        await this.updateProductValidator.validate({
            guid,
            name,
            description,
            categoryName,
            price,
            dayOfWeek,
        });

        const product = await this.repository.update({
            guid,
            name,
            description,
            categoryName,
            price,
            dayOfWeek,
        });

        if (!product)
            throw new ErrorHandler(
                "Error updating product",
                HttpStatusCode.BAD_REQUEST,
            );

        return product;
    }
}

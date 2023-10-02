import { IValidator } from "@/shared/infra/protocols/IValidator";
import { IProduct } from "../../model/IProduct";
import {
    ICreateProductDTO,
    IProductRepository,
} from "../../repositories/IProductRepository";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";

export class CreateProductValidator implements IValidator<ICreateProductDTO> {
    constructor(private readonly repository: IProductRepository) {}

    async validate({
        name,
        description,
        price,
        categoryName,
        dayOfWeek,
    }: ICreateProductDTO): Promise<void> {
        const productExists = await this.repository.findByName(name);
        if (productExists)
            throw new ErrorHandler(
                "Product already exists",
                HttpStatusCode.CONFLICT,
            );
    }
}


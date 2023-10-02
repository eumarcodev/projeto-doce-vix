import { IUseCase } from "@/shared/infra/protocols/IUseCase";
import { IProduct } from "../../model/IProduct";
import {
    IProductRepository,
    ICreateProductDTO,
} from "../../repositories/IProductRepository";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";

import { CreateProductService } from "../../services/validation/CreateProductService";

export class CreateProductUseCase
    implements IUseCase<ICreateProductDTO, IProduct>
{
    constructor(
        private readonly createProductService: CreateProductService,
        private readonly repository: IProductRepository,
    ) {}

    async execute(data: ICreateProductDTO): Promise<IProduct> {
        await this.createProductService.validate(data);

        const product = await this.repository.create(data);

        if (!product)
            throw new ErrorHandler(
                "Error on create product",
                HttpStatusCode.BAD_REQUEST,
            );

        return product;
    }
}

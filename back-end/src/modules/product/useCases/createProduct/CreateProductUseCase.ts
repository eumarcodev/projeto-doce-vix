import { IUseCase } from "@/shared/infra/protocols/IUseCase";
import { IProduct } from "../../model/IProduct";
import {
    IProductRepository,
    ICreateProductDTO,
} from "../../repositories/IProductRepository";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";

import { CreateProductService } from "../../services/CreateProductService";

export class CreateProductUseCase
    implements IUseCase<ICreateProductDTO, IProduct>
{
    constructor(private readonly createCategoryService: CreateProductService) {}

    async execute({
        name,
        description,
        price,
        categoryName,
        dayOfWeek,
    }: ICreateProductDTO): Promise<IProduct> {
        return await this.createCategoryService.execute({
            name,
            description,
            price,
            categoryName,
            dayOfWeek,
        });
    }
}


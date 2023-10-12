import { IUseCase } from "@/shared/infra/protocols/IUseCase";
import { IUpdateProductDTO } from "../../repositories/IProductRepository";
import { IProduct } from "../../model/IProduct";

import { UpdateProductService } from "../../services/UpdateProductService";

export class UpdateProductUseCase
    implements IUseCase<IUpdateProductDTO, IProduct>
{
    constructor(private readonly updateProductService: UpdateProductService) {}

    async execute({
        guid,
        name,
        description,
        categoryName,
        price,
        dayOfWeek,
    }: IUpdateProductDTO): Promise<IProduct> {
        return this.updateProductService.execute({
            guid,
            name,
            description,
            categoryName,
            price,
            dayOfWeek,
        });
    }
}

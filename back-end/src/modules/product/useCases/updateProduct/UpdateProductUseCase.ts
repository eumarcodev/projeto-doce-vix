import { IUseCase } from "@/shared/infra/protocols/IUseCase";

import { IProduct } from "../../model/IProduct";
import { IUpdateProductDTO } from "../../repositories/IProductRepository";
import { UpdateProductService } from "../../services/UpdateProductService";

export class UpdateProductUseCase
    implements IUseCase<IUpdateProductDTO, IProduct>
{
    constructor(private readonly updateProductService: UpdateProductService) {}

    async execute({
        guid,
        name,
        description,
        categoryGuid,
        price,
        dayOfWeek,
    }: IUpdateProductDTO): Promise<IProduct> {
        return this.updateProductService.execute({
            guid,
            name,
            description,
            categoryGuid,
            price,
            dayOfWeek,
        });
    }
}

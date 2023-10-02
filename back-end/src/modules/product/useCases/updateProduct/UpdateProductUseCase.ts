import { IUseCase } from "@/shared/infra/protocols/IUseCase";
import {
    IProductRepository,
    IUpdateProductDTO,
} from "../../repositories/IProductRepository";
import { IProduct } from "../../model/IProduct";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { UpdateProductService } from "../../services/validation/UpdateProductService";

export class UpdateProductUseCase
    implements IUseCase<IUpdateProductDTO, IProduct>
{
    constructor(
        private readonly repository: IProductRepository,
        private readonly updateProductService: UpdateProductService,
    ) {}

    async execute(data: IUpdateProductDTO): Promise<IProduct> {
        await this.updateProductService.validate(data);

        const product = await this.repository.update(data);

        if (!product)
            throw new ErrorHandler(
                "Error on update product",
                HttpStatusCode.BAD_REQUEST,
            );

        return product;
    }
}

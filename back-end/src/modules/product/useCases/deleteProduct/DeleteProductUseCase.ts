import { IUseCase } from "@/shared/infra/protocols/IUseCase";
import { IProduct } from "../../model/IProduct";
import { IProductRepository } from "../../repositories/IProductRepository";
import { DeleteProductService } from "../../services/validation/DeleteProductService";
import { IRequest } from "../../services/validation/DeleteProductService";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";

export class DeleteProductUseCase implements IUseCase<IRequest, IProduct> {
    constructor(
        private readonly repository: IProductRepository,
        private readonly deleteProductService: DeleteProductService,
    ) {}

    async execute(data: IRequest): Promise<IProduct> {
        await this.deleteProductService.validate(data);

        const product = await this.repository.delete(data.guid);

        if (!product)
            throw new ErrorHandler(
                "Error on delete product",
                HttpStatusCode.BAD_REQUEST,
            );

        return product;
    }
}

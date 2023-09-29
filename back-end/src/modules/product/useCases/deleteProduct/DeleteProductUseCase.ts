import { IUseCase } from "@/shared/infra/protocols/IUseCase";
import { IProduct } from "../../model/IProduct";
import { IProductRepository } from "../../repositories/IProductRepository";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";

interface IRequest {
    guid: string;
}

export class DeleteProductUseCase implements IUseCase<IRequest, IProduct> {
    constructor(private readonly repository: IProductRepository) {}

    async execute({ guid }: IRequest): Promise<IProduct> {
        const product = await this.repository.findByGuid(guid);

        if (!product)
            throw new ErrorHandler(
                "Product not found",
                HttpStatusCode.NOT_FOUND,
            );

        await this.repository.delete(guid);

        return product;
    }
}

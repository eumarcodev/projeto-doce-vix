import { IValidator } from "@/shared/infra/protocols/IService";
import { IProductRepository } from "../../repositories/IProductRepository";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";

export interface IRequest {
    guid: string;
}

export class DeleteProductService implements IValidator<IRequest> {
    constructor(private readonly repository: IProductRepository) {}

    async validate(data: IRequest): Promise<void> {
        const { guid } = data;

        const product = await this.repository.findByGuid(guid);

        if (!product)
            throw new ErrorHandler(
                "Product not found",
                HttpStatusCode.NOT_FOUND,
            );
    }
}

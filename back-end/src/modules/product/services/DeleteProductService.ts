import { IService } from "@/shared/infra/protocols/IService";
import { IProduct } from "../model/IProduct";
import { IProductRepository } from "../repositories/IProductRepository";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";

export class DeleteProcutService implements IService<string, IProduct> {
    constructor(private readonly repository: IProductRepository) {}
    async execute(guid: string): Promise<IProduct> {
        const productExists = await this.repository.findByGuid(guid);

        if (!productExists) {
            throw new ErrorHandler(
                "Product not found",
                HttpStatusCode.NOT_FOUND,
            );
        }

        await this.repository.delete(productExists.guid);

        return productExists;
    }
}

import { IValidator } from "@/shared/infra/protocols/IService";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";

export interface IRequest {
    guid: string;
}

export class DeleteProductService implements IValidator<IRequest> {
    constructor(private readonly repository: ICategoryRepository) {}

    async validate(data: IRequest): Promise<void> {
        const { guid } = data;

        const product = await this.repository.findByGuid(guid);

        if (!product)
            throw new ErrorHandler(
                "Category not found",
                HttpStatusCode.NOT_FOUND,
            );
    }
}

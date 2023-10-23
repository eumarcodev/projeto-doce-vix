import { IProductRepository } from "@/modules/product/repositories/IProductRepository";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { IValidator } from "@/shared/infra/protocols/IValidator";
import { ICreateOrderItemDTO } from "../../repositories/IOrderItemRepository";

export class CreateOrderValidator implements IValidator<ICreateOrderItemDTO> {
    constructor(
        private readonly productRepository: IProductRepository) { }

    async validate(data: ICreateOrderItemDTO): Promise<void> {
        const { productId, quantity } = data;

        const productExist = await this.productRepository.findById(productId)

        if (!productExist)

            throw new ErrorHandler(
                "product not found",
                HttpStatusCode.BAD_REQUEST,
            );

        if (quantity < 1) throw new ErrorHandler(
            "the quantity must be greater than or equal to 1",
            HttpStatusCode.BAD_REQUEST,
        );
    }
}

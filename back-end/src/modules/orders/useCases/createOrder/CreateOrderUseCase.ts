import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { IUseCase } from "@/shared/infra/protocols/IUseCase";

import { IOrder } from "../../models/IOrder";
import {
    ICreateOrderDTO,
    IOrderRepository,
} from "../../repositories/IOrderRepository";

export class CreateOrderUseCase implements IUseCase<ICreateOrderDTO, IOrder> {
    constructor(private readonly repository: IOrderRepository) {}

    async execute({ userId, total }: ICreateOrderDTO): Promise<IOrder> {
        const order = await this.repository.create({ userId, total });

        console.log(order);

        if (!order)
            throw new ErrorHandler(
                "Error on create order",
                HttpStatusCode.BAD_REQUEST,
            );

        return order;
    }
}

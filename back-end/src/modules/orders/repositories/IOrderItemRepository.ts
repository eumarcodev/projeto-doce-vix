import { IOrderItem } from "../models/IOrderItem";

interface ICreateOrderItemDTO {
    orderId: string
    productId: string
    quantity: number
}

interface IUpdateOrderItemDTO {
    guid: string;
    productId: string;
    quantity?: number;
}

interface IOrderItemRepository {
    create({
        orderId,
        productId,
        quantity,
    }: ICreateOrderItemDTO): Promise<IOrderItem | undefined>

}

export { ICreateOrderItemDTO, IOrderItemRepository, IUpdateOrderItemDTO };


import { IOrderItem } from "./IOrderItem"

export interface IOrder {
    id: string
    guid: string
    userId: string
    itens: IOrderItem[]
    total: number
    status: string
    createdAt: Date;
    updatedAt: Date;
}

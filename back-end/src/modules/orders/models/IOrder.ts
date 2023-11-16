import { IOrderItem } from "./IOrderItem";

export interface IOrder {
    id: number;
    guid: string;
    userId: number;
    itens: IOrderItem[];
    total: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

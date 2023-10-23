import { IOrder } from "../models/IOrder";

interface ICreateOrderDTO {
    userId: string
    total: number
}

interface IListOrdersResponse {
    orders: IOrder[]
    count: number
}

interface IListOrdersRequest {
    search?: string;
    limit?: number;
    offset?: number;
}
interface IOrderRepository {
    findById(id: string): Promise<IOrder | undefined>
    create({
        userId,
        total,
    }: ICreateOrderDTO): Promise<IOrder | undefined>
    list({
        search,
        limit,
        offset,
    }: IListOrdersRequest): Promise<IListOrdersResponse | undefined>
}

export { ICreateOrderDTO, IListOrdersRequest, IListOrdersResponse, IOrderRepository };


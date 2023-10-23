import { IProduct } from "@/modules/product/model/IProduct"
export interface IProductSubset extends Pick<IProduct, 'id' | 'name' | 'description' | 'price'> { }

export interface IOrderItem {
    id: string
    guid: string
    product: IProductSubset
    quantity: number
    price: number
    orderId: string
    createdAt: Date;
    updatedAt: Date;
}

export interface IProduct {
    id: number;
    guid: string;
    name: string;
    description: string;
    price: number;
    categoryId: number;
    dayOfWeekId?: number;
    createdAt: Date;
    updatedAt: Date;
}

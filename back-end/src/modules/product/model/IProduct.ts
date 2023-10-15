import { ICategory } from "@/modules/category/model/ICategory";
import { IDayOfWeek } from "@/modules/dayOfWeek/model/IDayOfWeek";

export interface IProduct {
    id: number;
    guid: string;
    name: string;
    description: string;
    price: number;
    category: ICategory;
    dayOfWeek?: IDayOfWeek;
    createdAt: Date;
    updatedAt: Date;
}

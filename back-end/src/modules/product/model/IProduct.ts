import { ICategory } from "@/modules/category/model/ICategory";
import { IDayOfWeek } from "@/modules/dayOfWeek/model/IDayOfWeek";
import { IFile } from "@/modules/file/model/IFile";

export interface IProduct {
    id: string;
    guid: string;
    name: string;
    description: string;
    price: number;
    category: ICategory;
    files?: IFile;
    dayOfWeek?: IDayOfWeek;
    createdAt: Date;
    updatedAt: Date;
}

import { IProduct } from "../model/IProduct";

interface ICreateProductDTO {
    name: string;
    description: string;
    price: number;
    categoryName: string;
    dayOfWeek?: string;
}

interface IUpdateProductDTO {
    guid: string;
    name?: string;
    description?: string;
    categoryName?: string;
    price?: number;
    dayOfWeek?: string;
}

interface IListProductResponse {
    products: IProduct[];
    count: number;
}

interface IListProductRequest {
    search?: string;
    limit?: number;
    offset?: number;
}

interface IProductRepository {
    findByName(name: string): Promise<IProduct | undefined>;
    create({
        name,
        description,
        price,
        categoryName,
        dayOfWeek,
    }: ICreateProductDTO): Promise<IProduct | undefined>;
    update({
        guid,
        name,
        description,
        price,
        categoryName,
        dayOfWeek,
    }: IUpdateProductDTO): Promise<IProduct | undefined>;
    delete(guid: string): Promise<IProduct | undefined>;
    list({
        search,
        limit,
        offset,
    }: IListProductRequest): Promise<IListProductResponse | undefined>;

    findById(id: number): Promise<IProduct | undefined>;
}

export {
    ICreateProductDTO, IListProductRequest, IListProductResponse, IProductRepository, IUpdateProductDTO
};


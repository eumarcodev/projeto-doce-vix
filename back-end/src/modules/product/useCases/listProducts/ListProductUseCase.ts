import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import {
    IListPaginatedUseCase,
    IListUseCaseParams,
} from "@/shared/infra/protocols/IListUseCase";
import { ICurrentPageValidation } from "@/shared/utils/pagination/adapters/ICurrentPageValidation";
import { IOffsetGenerator } from "@/shared/utils/pagination/adapters/IOffset";
import { ITotalPagesGenerator } from "@/shared/utils/pagination/adapters/ITotalPagesGenerator";
import { IPaginationResponse } from "@/shared/utils/pagination/interfaces/IPaginationResponse";
import { ISorting } from "@/shared/utils/tools/adapters/ISorting";

import { IProduct } from "../../model/IProduct";
import { IProductRepository } from "../../repositories/IProductRepository";

export class ListProductUseCase implements IListPaginatedUseCase<IProduct> {
    constructor(
        private readonly repository: IProductRepository,
        private readonly sorting: ISorting,
        private readonly offsetGenerator: IOffsetGenerator,
        private readonly totalPagesGenerator: ITotalPagesGenerator,
        private readonly currentPageValidation: ICurrentPageValidation,
    ) {}
    async execute({
        search,
        limit,
        page,
    }: IListUseCaseParams): Promise<IPaginationResponse<IProduct>> {
        const offset = this.offsetGenerator.generate({ page, limit });

        const products = await this.repository.list({
            search,
            limit: page !== undefined && limit ? limit : undefined,
            offset: page !== undefined && limit ? offset : undefined,
        });

        if (!products)
            throw new ErrorHandler(
                "Error on get products from database",
                HttpStatusCode.BAD_REQUEST,
            );

        const totalPages = this.totalPagesGenerator.generate({
            totalRegisters: products.count,
            limit,
        });

        this.currentPageValidation.validate({
            totalPages,
            currentPage: page,
        });

        return {
            result: products.products,
            currentPage: page ?? 0,
            totalRegisters: products.count,
            totalPages,
        };
    }
}

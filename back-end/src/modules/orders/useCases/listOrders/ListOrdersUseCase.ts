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

import { IOrder } from "../../models/IOrder";
import { IOrderRepository } from "../../repositories/IOrderRepository";

export class ListOrdersUseCase implements IListPaginatedUseCase<IOrder> {
    constructor(
        private readonly repository: IOrderRepository,
        private readonly sorting: ISorting,
        private readonly offsetGenerator: IOffsetGenerator,
        private readonly totalPagesGenerator: ITotalPagesGenerator,
        private readonly currentPageValidation: ICurrentPageValidation,
    ) {}
    async execute({
        search,
        limit,
        page,
    }: IListUseCaseParams): Promise<IPaginationResponse<IOrder>> {
        const offset = this.offsetGenerator.generate({ page, limit });

        const orders = await this.repository.list({
            search,
            limit: page !== undefined && limit ? limit : undefined,
            offset: page !== undefined && limit ? offset : undefined,
        });

        if (!orders)
            throw new ErrorHandler(
                "Error on get files from database",
                HttpStatusCode.BAD_REQUEST,
            );

        const totalPages = this.totalPagesGenerator.generate({
            totalRegisters: orders.count,
            limit,
        });

        this.currentPageValidation.validate({
            totalPages,
            currentPage: page,
        });

        return {
            result: orders.orders,
            currentPage: page ?? 0,
            totalRegisters: orders.count,
            totalPages,
        };
    }
}

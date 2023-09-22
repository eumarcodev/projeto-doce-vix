import {
    IListPaginatedUseCase,
    IListUseCaseParams,
} from "@/shared/infra/protocols/IListUseCase";
import { ICategory } from "../../model/ICategory";
import { IPaginationResponse } from "@/shared/utils/pagination/interfaces/IPaginationResponse";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";
import { ISorting } from "@/shared/utils/tools/adapters/ISorting";
import { IOffsetGenerator } from "@/shared/utils/pagination/adapters/IOffset";
import { ITotalPagesGenerator } from "@/shared/utils/pagination/adapters/ITotalPagesGenerator";
import { ICurrentPageValidation } from "@/shared/utils/pagination/adapters/ICurrentPageValidation";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";

export class ListCategoryUseCase implements IListPaginatedUseCase<ICategory> {
    constructor(
        private readonly repository: ICategoryRepository,
        private readonly sorting: ISorting,
        private readonly offsetGenerator: IOffsetGenerator,
        private readonly totalPagesGenerator: ITotalPagesGenerator,
        private readonly currentPageValidation: ICurrentPageValidation,
    ) {}
    async execute({
        search,
        limit,
        page,
    }: IListUseCaseParams): Promise<IPaginationResponse<ICategory>> {
        const offset = this.offsetGenerator.generate({ page, limit });

        const categories = await this.repository.list({
            search,
            limit: page !== undefined && limit ? limit : undefined,
            offset: page !== undefined && limit ? offset : undefined,
        });

        if (!categories)
            throw new ErrorHandler(
                "Error on get categories from database",
                HttpStatusCode.BAD_REQUEST,
            );

        const totalPages = this.totalPagesGenerator.generate({
            totalRegisters: categories.count,
            limit,
        });

        this.currentPageValidation.validate({
            totalPages,
            currentPage: page,
        });

        return {
            result: categories.categories,
            currentPage: page ?? 0,
            totalRegisters: categories.count,
            totalPages,
        };
    }
}


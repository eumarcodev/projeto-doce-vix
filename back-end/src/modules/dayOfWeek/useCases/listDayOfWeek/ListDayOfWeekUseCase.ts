import {
    IListPaginatedUseCase,
    IListUseCaseParams,
} from "@/shared/infra/protocols/IListUseCase";
import { IDayOfWeek } from "../../model/IDayOfWeek";
import { IPaginationResponse } from "@/shared/utils/pagination/interfaces/IPaginationResponse";
import { IDayOfWeekRepository } from "../../repositories/IDayOfWeekRepository";
import { ISorting } from "@/shared/utils/tools/adapters/ISorting";
import { IOffsetGenerator } from "@/shared/utils/pagination/adapters/IOffset";
import { ITotalPagesGenerator } from "@/shared/utils/pagination/adapters/ITotalPagesGenerator";
import { ICurrentPageValidation } from "@/shared/utils/pagination/adapters/ICurrentPageValidation";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";

export class ListDayOfWeekUseCase implements IListPaginatedUseCase<IDayOfWeek> {
    constructor(
        private readonly repository: IDayOfWeekRepository,
        private readonly sorting: ISorting,
        private readonly offsetGenerator: IOffsetGenerator,
        private readonly totalPagesGenerator: ITotalPagesGenerator,
        private readonly currentPageValidation: ICurrentPageValidation,
    ) {}
    async execute({
        search,
        limit,
        page,
    }: IListUseCaseParams): Promise<IPaginationResponse<IDayOfWeek>> {
        const offset = this.offsetGenerator.generate({ page, limit });

        const dayOfWeeks = await this.repository.list({
            search,
            limit: page !== undefined && limit ? limit : undefined,
            offset: page !== undefined && limit ? offset : undefined,
        });

        if (!dayOfWeeks)
            throw new ErrorHandler(
                "Error on get day of week from database",
                HttpStatusCode.BAD_REQUEST,
            );

        const totalPages = this.totalPagesGenerator.generate({
            totalRegisters: dayOfWeeks.count,
            limit,
        });

        this.currentPageValidation.validate({
            totalPages,
            currentPage: page,
        });

        return {
            result: dayOfWeeks.dayofWeeks,
            currentPage: page ?? 0,
            totalRegisters: dayOfWeeks.count,
            totalPages,
        };
    }
}

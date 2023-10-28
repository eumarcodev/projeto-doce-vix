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

import { IFile } from "../../model/IFile";
import { IFileRepository } from "../../repositories/IFileRepository";

export class ListFilesUseCase implements IListPaginatedUseCase<IFile> {
    constructor(
        private readonly repository: IFileRepository,
        private readonly sorting: ISorting,
        private readonly offsetGenerator: IOffsetGenerator,
        private readonly totalPagesGenerator: ITotalPagesGenerator,
        private readonly currentPageValidation: ICurrentPageValidation,
    ) {}
    async execute({
        search,
        limit,
        page,
    }: IListUseCaseParams): Promise<IPaginationResponse<IFile>> {
        const offset = this.offsetGenerator.generate({ page, limit });

        const files = await this.repository.list({
            search,
            limit: page !== undefined && limit ? limit : undefined,
            offset: page !== undefined && limit ? offset : undefined,
        });

        if (!files)
            throw new ErrorHandler(
                "Error on get files from database",
                HttpStatusCode.BAD_REQUEST,
            );

        const totalPages = this.totalPagesGenerator.generate({
            totalRegisters: files.count,
            limit,
        });

        this.currentPageValidation.validate({
            totalPages,
            currentPage: page,
        });

        return {
            result: files.files,
            currentPage: page ?? 0,
            totalRegisters: files.count,
            totalPages,
        };
    }
}

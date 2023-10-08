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

import { IUser } from "../../model/IUser";
import { IUserRepository } from "../../repositories/IUserRepository";

export class ListUsersUseCase implements IListPaginatedUseCase<IUser> {
    constructor(
        private readonly repository: IUserRepository,
        private readonly sorting: ISorting,
        private readonly offsetGenerator: IOffsetGenerator,
        private readonly totalPagesGenerator: ITotalPagesGenerator,
        private readonly currentPageValidation: ICurrentPageValidation,
    ) {}
    async execute({
        search,
        limit,
        page,
    }: IListUseCaseParams): Promise<IPaginationResponse<IUser>> {
        const offset = this.offsetGenerator.generate({ page, limit });

        const users = await this.repository.list({
            search,
            limit: page !== undefined && limit ? limit : undefined,
            offset: page !== undefined && limit ? offset : undefined,
        });

        if (!users)
            throw new ErrorHandler(
                "Error on get users from database",
                HttpStatusCode.BAD_REQUEST,
            );

        const totalPages = this.totalPagesGenerator.generate({
            totalRegisters: users.count,
            limit,
        });

        this.currentPageValidation.validate({
            totalPages,
            currentPage: page,
        });

        return {
            result: users.users,
            currentPage: page ?? 0,
            totalRegisters: users.count,
            totalPages,
        };
    }
}

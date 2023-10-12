import { IDayOfWeek } from "../model/IDayOfWeek";

interface IListDayOfWeekResponse {
    dayofWeeks: IDayOfWeek[];
    count: number;
}

interface IListCategoryRequest {
    search?: string;
    limit?: number;
    offset?: number;
}

interface IDayOfWeekRepository {
    findByName(name: string): Promise<IDayOfWeek | undefined>;
    list({
        search,
        limit,
        offset,
    }: IListCategoryRequest): Promise<IListDayOfWeekResponse | undefined>;
}

export { IListDayOfWeekResponse, IListCategoryRequest, IDayOfWeekRepository };

import { IController } from "@/shared/infra/protocols/IController";
import { Request, Response, NextFunction } from "express";
import { ListDayOfWeekUseCase } from "./ListDayOfWeekUseCase";
import { validateQuery } from "@/shared/utils/validateQueryList";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";

export class ListDayOfWeekController implements IController {
    constructor(private readonly listDayOfWeekUseCase: ListDayOfWeekUseCase) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            await validateQuery(request);
            const {
                q: search,
                p: page,
                l: limit,
                orderBy,
                orderMode,
            } = request.query;

            const dayOfWeek = await this.listDayOfWeekUseCase.execute({
                search: search?.toString(),
                limit: limit ? Number(limit) : undefined,
                page: limit ? Number(page) : undefined,
                orderBy: orderBy?.toString(),
                orderMode: orderMode?.toString(),
            });

            return response.status(HttpStatusCode.OK).json(dayOfWeek);
        } catch (error) {
            next(error);
        }
    }
}

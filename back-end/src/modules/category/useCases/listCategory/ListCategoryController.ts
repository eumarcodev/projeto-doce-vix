import { IContext } from "@/shared/infra/database/Context";
import { IController } from "@/shared/infra/protocols/IController";
import { Request, Response, NextFunction } from "express";
import { ListCategoryUseCase } from "./ListCategoryUseCase";
import { validateQuery } from "@/shared/utils/validateQueryList";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";

export class ListCategoryController implements IController {
    constructor(private readonly listCategoryUseCase: ListCategoryUseCase) {}

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

            const categories = await this.listCategoryUseCase.execute({
                search: search?.toString(),
                limit: limit ? Number(limit) : undefined,
                page: limit ? Number(page) : undefined,
                orderBy: orderBy?.toString(),
                orderMode: orderMode?.toString(),
            });

            return response.status(HttpStatusCode.OK).json(categories);
        } catch (error) {
            next(error);
        }
    }
}


import { NextFunction, Request, Response } from "express";

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { IController } from "@/shared/infra/protocols/IController";
import { validateQuery } from "@/shared/utils/validateQueryList";

import { ListFilesUseCase } from "./ListFilesUseCase";

export class ListFilesController implements IController {
    constructor(private readonly listFilesUseCase: ListFilesUseCase) { }

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

            const files = await this.listFilesUseCase.execute({
                search: search?.toString(),
                limit: limit ? Number(limit) : undefined,
                page: limit ? Number(page) : undefined,
                orderBy: orderBy?.toString(),
                orderMode: orderMode?.toString(),
            });

            return response.status(HttpStatusCode.OK).json(files);
        } catch (error) {
            next(error);
        }
    }
}

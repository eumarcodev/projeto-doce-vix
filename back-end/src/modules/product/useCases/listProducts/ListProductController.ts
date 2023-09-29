import { IController } from "@/shared/infra/protocols/IController";
import { Request, Response, NextFunction } from "express";
import { ListProductUseCase } from "./ListProductUseCase";
import { validateQuery } from "@/shared/utils/validateQueryList";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";

export class ListProductsController implements IController {
    constructor(private readonly listProductsUseCase: ListProductUseCase) {}

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

            const products = await this.listProductsUseCase.execute({
                search: search?.toString(),
                limit: limit ? Number(limit) : undefined,
                page: limit ? Number(page) : undefined,
                orderBy: orderBy?.toString(),
                orderMode: orderMode?.toString(),
            });

            return response.status(HttpStatusCode.OK).json(products);
        } catch (error) {
            next(error);
        }
    }
}

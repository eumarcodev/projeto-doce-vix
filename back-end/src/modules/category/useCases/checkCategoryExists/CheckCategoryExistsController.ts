import { Request, Response, NextFunction } from "express";

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { IController } from "@/shared/infra/protocols/IController";

import { CheckCategoryExistsUseCase } from "./CheckCategoryExistsUseCase";

class CheckCategoryExistsController implements IController {
    constructor(private readonly useCase: CheckCategoryExistsUseCase) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { name } = request.params;

            const category = await this.useCase.execute({ name });

            return response.status(HttpStatusCode.OK).json(category);
        } catch (error) {
            next(error);
        }
    }
}

export { CheckCategoryExistsController };

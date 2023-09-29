import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { IController } from "@/shared/infra/protocols/IController";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController implements IController {
    constructor(private readonly useCase: CreateCategoryUseCase) {}
    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { name, description } = request.body;

            const category = await this.useCase.execute({
                name,
                description,
            });

            return response.status(HttpStatusCode.CREATED).json(category);
        } catch (error) {
            next(error);
        }
    }
}

export { CreateCategoryController };

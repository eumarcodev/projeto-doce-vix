import { Request, Response, NextFunction } from "express";

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { IController } from "@/shared/infra/protocols/IController";

import { UpdateProductUseCase } from "./UpdateProductUseCase";

export class UpdateProductController implements IController {
    constructor(private readonly useCase: UpdateProductUseCase) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { guid, name, description, price, dayOfWeek, categoryName } =
                request.body;

            const Updateproduct = await this.useCase.execute({
                guid,
                name,
                description,
                categoryName,
                price,
                dayOfWeek,
            });

            return response.status(HttpStatusCode.OK).json(Updateproduct);
        } catch (error) {
            next(error);
        }
    }
}

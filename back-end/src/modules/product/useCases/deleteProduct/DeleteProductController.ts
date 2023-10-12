import { Request, Response, NextFunction } from "express";

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { IController } from "@/shared/infra/protocols/IController";

import { DeleteProductUseCase } from "./DeleteProductUseCase";

export class DeleteProductController implements IController {
    constructor(private readonly useCase: DeleteProductUseCase) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { guid } = request.params;

            const deleteProduct = await this.useCase.execute(guid);

            response.status(HttpStatusCode.OK).json(deleteProduct);
        } catch (error) {
            next(error);
        }
    }
}

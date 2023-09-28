import { IController } from "@/shared/infra/protocols/IController";
import { Request, Response, NextFunction } from "express";
import { CreateProductUseCase } from "./CreateProductUseCase";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";

class CreateProductController implements IController {
    constructor(private readonly useCase: CreateProductUseCase) {}
    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { name, description, categoryName, price, dayOfWeek } =
                request.body;

            const product = await this.useCase.execute({
                name,
                description,
                categoryName,
                price,
                dayOfWeek,
            });

            return response.status(HttpStatusCode.CREATED).json(product);
        } catch (error) {
            next(error);
        }
    }
}

export { CreateProductController }

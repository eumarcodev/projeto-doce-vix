import { IController } from "@/shared/infra/protocols/IController";
import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";
import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";

class UpdateCategoryController implements IController {
    constructor(private readonly useCase: UpdateCategoryUseCase) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { guid, name, description } = request.body;

            console.log(guid, name, description);

            const category = await this.useCase.execute({
                guid,
                name,
                description,
            });
            return response.status(HttpStatusCode.CREATED).json(category);
        } catch (error) {
            next(error);
        }
    }
}

export { UpdateCategoryController };


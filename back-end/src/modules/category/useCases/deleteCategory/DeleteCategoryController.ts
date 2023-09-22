import { IController } from "@/shared/infra/protocols/IController";
import { Request, Response, NextFunction } from "express";
import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";

class DeleteCategoryController implements IController {
    constructor(private readonly useCase: DeleteCategoryUseCase) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { guid } = request.params;

            const deletedCategory = await this.useCase.execute({ guid });


            return response.status(HttpStatusCode.OK).json(deletedCategory);
        } catch (error) {
            next(error);
        }
    }
}

export { DeleteCategoryController };

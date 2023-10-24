import { NextFunction, Request, Response } from "express";

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { IController } from "@/shared/infra/protocols/IController";

import { DeleteFileUseCase } from "./DeleteFIleUseCase";

class DeleteFileController implements IController {
    constructor(private readonly useCase: DeleteFileUseCase) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { guid } = request.params;

            const deletedFile = await this.useCase.execute(guid);

            return response.status(HttpStatusCode.OK).json(deletedFile);
        } catch (error) {
            next(error);
        }
    }
}

export { DeleteFileController };

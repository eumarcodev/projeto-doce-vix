import { Request, Response, NextFunction } from "express";

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { IController } from "@/shared/infra/protocols/IController";

import { RefreshTokenUserUseCase } from "./RefreshTokenUserUseCase";

class RefreshTokenUserController implements IController {
    constructor(private readonly useCase: RefreshTokenUserUseCase) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { id } = request.body;

            const user = await this.useCase.execute(id);

            return response.status(HttpStatusCode.CREATED).json(user);
        } catch (error) {
            next(error);
        }
    }
}

export { RefreshTokenUserController };

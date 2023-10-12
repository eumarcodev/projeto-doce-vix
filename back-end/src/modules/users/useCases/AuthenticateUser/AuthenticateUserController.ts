import { Request, Response, NextFunction } from "express";

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { IController } from "@/shared/infra/protocols/IController";

import { AuthenticateUserUseCase } from "./AuthenticateUserUsecase";

class AuthenticateUserController implements IController {
    constructor(private readonly useCase: AuthenticateUserUseCase) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { email, password } = request.body;

            const user = await this.useCase.execute({
                email,
                password,
            });

            return response.status(HttpStatusCode.CREATED).json(user);
        } catch (error) {
            next(error);
        }
    }
}

export { AuthenticateUserController };

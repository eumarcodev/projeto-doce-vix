import { Request, Response, NextFunction } from "express";

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { IController } from "@/shared/infra/protocols/IController";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController implements IController {
    constructor(private readonly useCase: CreateUserUseCase) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { name, email, encryptedPassword } = request.body;

            const user = await this.useCase.execute({
                name,
                email,
                encryptedPassword,
            });

            return response.status(HttpStatusCode.CREATED).json(user);
        } catch (error) {
            next(error);
        }
    }
}

export { CreateUserController };

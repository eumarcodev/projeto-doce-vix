import { Request, Response, NextFunction } from "express";

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { IController } from "@/shared/infra/protocols/IController";
import { UpdateUserUsecase } from "./UpdateUserUseCase";

class UpdateUserController implements IController {
    constructor(private readonly useCase: UpdateUserUsecase) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { guid, name, email, encryptedPassword } = request.body;

            const user = await this.useCase.execute({
                guid,
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

export { UpdateUserController };

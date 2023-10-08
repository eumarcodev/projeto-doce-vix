import { Router } from "express";
import { authUserController } from "@/modules/users/useCases/AuthenticateUser";

const authRoutes = Router();

authRoutes.post("/", (request, response, next) => {
    return authUserController.handle(request, response, next);
});

export { authRoutes };

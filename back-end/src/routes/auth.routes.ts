import { authUserController } from "@/modules/users/useCases/AuthenticateUser";
import { Router } from "express";

const authRoutes = Router();

authRoutes.post("/", (request, response, next) => {
    return authUserController.handle(request, response, next);
});

export { authRoutes };


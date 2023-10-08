import { Router } from "express";
import { createUserController } from "@/modules/users/useCases/Createuser";
import { updateUserController } from "@/modules/users/useCases/updateUser";
import { listUsersController } from "@/modules/users/useCases/listUsers";
import { authUserController } from "@/modules/users/useCases/AuthenticateUser";

const userRoutes = Router();

userRoutes.post("/", (request, response, next) => {
    return createUserController.handle(request, response, next);
});

userRoutes.put("/", (request, response, next) => {
    return updateUserController.handle(request, response, next);
});

userRoutes.get("/", (request, response, next) => {
    return listUsersController.handle(request, response, next);
});

userRoutes.post("/", (request, response, next) => {
    return authUserController.handle(request, response, next);
});

export { userRoutes };

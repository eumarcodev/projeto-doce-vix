import { refreshTokenController } from "@/modules/users/useCases/RefreshToken";
import { Router } from "express";

const refreshRouter = Router();

refreshRouter.post("/", (request, response, next) => {
    return refreshTokenController.handle(request, response, next);
});

export { refreshRouter };


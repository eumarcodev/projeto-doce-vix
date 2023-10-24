import { Router } from "express";

import { refreshTokenController } from "@/modules/users/useCases/RefreshToken";

const refreshRouter = Router();

refreshRouter.post("/", (request, response, next) => {
    return refreshTokenController.handle(request, response, next);
});

export { refreshRouter };

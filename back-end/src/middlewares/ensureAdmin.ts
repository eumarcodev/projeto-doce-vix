import { NextFunction, Request, Response } from "express";

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";

const ensureAdmin = (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    if (request.user.role !== "ADMIN")
        throw new ErrorHandler(
            "Access denied. Admin only.",
            HttpStatusCode.FORBIDDEN,
        );

    return next();
};

export { ensureAdmin };

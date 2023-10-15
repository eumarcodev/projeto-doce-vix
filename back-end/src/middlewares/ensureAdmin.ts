import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { NextFunction, Request, Response } from "express";

const ensureAdmin = (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if (request.user.role !== 'ADMIN')
        throw new ErrorHandler("Access denied. Admin only.", HttpStatusCode.FORBIDDEN);

    return next();
};

export { ensureAdmin };

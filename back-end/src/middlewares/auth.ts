import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";

const getToken = (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if (!authHeader)
        throw new ErrorHandler("Token is missing", HttpStatusCode.UNAUTHORIZED);

    const [, token] = authHeader.split(" ");

    try {
        verify(token, String(process.env.JWT_SALT));

        return next();
    } catch (error) {
        throw new ErrorHandler("Token invalid", HttpStatusCode.UNAUTHORIZED);
    }
};

export { getToken };

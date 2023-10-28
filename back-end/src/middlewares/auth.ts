import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";

const getToken = (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if (!authHeader)
        throw new ErrorHandler("Token is missing", HttpStatusCode.UNAUTHORIZED);

    const [, token] = authHeader.split(" ");

    try {
        const decoded = verify(
            token,
            String(process.env.JWT_SALT),
        ) as JwtPayload;
        request.user = decoded;

        return next();
    } catch (error) {
        throw new ErrorHandler("Token invalid", HttpStatusCode.UNAUTHORIZED);
    }
};

export { getToken };

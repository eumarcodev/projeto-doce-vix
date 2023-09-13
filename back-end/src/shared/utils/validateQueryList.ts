import * as Yup from "yup";
import { Request } from "express";

export const validateQuery = async (request: Request): Promise<void> => {
    const schema = Yup.object({
        q: Yup.string().trim(),
        l: Yup.number().min(1),
        p: Yup.number().min(0),
    });

    await schema.validate(request);
};


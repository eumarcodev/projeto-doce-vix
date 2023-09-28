import { createProductController } from "@/modules/product/useCases/createProduct";
import { Router } from "express";

const productRoutes = Router();

productRoutes.post("/", (request, response, next) => {
    return createProductController.handle(request, response, next);
});

export { productRoutes }

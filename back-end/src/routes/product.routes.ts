import { createProductController } from "@/modules/product/useCases/createProduct";
import { listProductsController } from "@/modules/product/useCases/listProducts";
import { Router } from "express";

const productRoutes = Router();

productRoutes.get("/", (request, response, next) => {
    return listProductsController.handle(request, response, next);
})

productRoutes.post("/", (request, response, next) => {
    return createProductController.handle(request, response, next);
});

export { productRoutes }

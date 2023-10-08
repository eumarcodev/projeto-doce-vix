import { createProductController } from "@/modules/product/useCases/createProduct";
import { listProductsController } from "@/modules/product/useCases/listProducts";
import { updateProductController } from "@/modules/product/useCases/updateProduct";
import { deleteProductController } from "@/modules/product/useCases/deleteProduct";
import { getToken } from "@/middlewares/auth";
import { Router } from "express";

const productRoutes = Router();

productRoutes.get("/", getToken, (request, response, next) => {
    return listProductsController.handle(request, response, next);
});

productRoutes.post("/", (request, response, next) => {
    return createProductController.handle(request, response, next);
});

productRoutes.delete("/:guid", (request, response, next) => {
    return deleteProductController.handle(request, response, next);
});

productRoutes.put("/", (request, response, next) => {
    return updateProductController.handle(request, response, next);
});

export { productRoutes };

import { createProductController } from "@/modules/product/useCases/createProduct";
import { deleteProductController } from "@/modules/product/useCases/deleteProduct";
import { listProductsController } from "@/modules/product/useCases/listProducts";
import { updateProductController } from "@/modules/product/useCases/updateProduct";
import { Router } from "express";

const productRoutes = Router();

productRoutes.get("/", (request, response, next) => {
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

// getToken, ensureAdmin, 

export { productRoutes };


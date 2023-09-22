import { createCategoryController } from "@/modules/category/useCases/createCategory";
import { listCategoryController } from "@/modules/category/useCases/listCategory";
import { deleteCategoryController } from "@/modules/category/useCases/deleteCategory";
import { Router } from "express";

const categoryRoutes = Router();

categoryRoutes.get("/", (request, response, next) => {
    return listCategoryController.handle(request, response, next);
});

categoryRoutes.post("/", (request, response, next) => {
    return createCategoryController.handle(request, response, next);
});

categoryRoutes.delete("/:guid", (request, response, next) => {
    return deleteCategoryController.handle(request, response, next);
});

export { categoryRoutes };

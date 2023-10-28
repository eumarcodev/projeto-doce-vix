import { Router } from "express";

import { getToken } from "@/middlewares/auth";
import { ensureAdmin } from "@/middlewares/ensureAdmin";
import { createCategoryController } from "@/modules/category/useCases/createCategory";
import { deleteCategoryController } from "@/modules/category/useCases/deleteCategory";
import { listCategoryController } from "@/modules/category/useCases/listCategory";
import { updateCategoryController } from "@/modules/category/useCases/updateCategory";

const categoryRoutes = Router();

categoryRoutes.get("/", (request, response, next) => {
    return listCategoryController.handle(request, response, next);
});

categoryRoutes.post("/", getToken, ensureAdmin, (request, response, next) => {
    return createCategoryController.handle(request, response, next);
});

categoryRoutes.delete("/:guid", (request, response, next) => {
    return deleteCategoryController.handle(request, response, next);
});

categoryRoutes.put("/", (request, response, next) => {
    return updateCategoryController.handle(request, response, next);
});

export { categoryRoutes };


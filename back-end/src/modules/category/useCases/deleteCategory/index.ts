import { CategoryPrismaFactory } from "../../factories/CategoryPrismaFactory";
import { CategoryPrismaRepository } from "../../repositories/implementations/CategoryRepository";
import { DeleteCategoryController } from "./DeleteCategoryController";
import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";
import { DeleteProductService } from "../../services/validation/DeleteCategoryService";

const categoryFactory = new CategoryPrismaFactory();
const categoryRepository = new CategoryPrismaRepository(categoryFactory);
const deleteCategoryService = new DeleteProductService(categoryRepository);
const deleteCategoryUseCase = new DeleteCategoryUseCase(
    categoryRepository,
    deleteCategoryService,
);
const deleteCategoryController = new DeleteCategoryController(
    deleteCategoryUseCase,
);

export { deleteCategoryController };

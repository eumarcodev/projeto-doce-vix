import { CategoryPrismaFactory } from "../../factories/CategoryPrismaFactory";
import { CategoryPrismaRepository } from "../../repositories/implementations/CategoryRepository";
import { DeleteCategoryService } from "../../services/DeleteCategoryService";
import { DeleteCategoryController } from "./DeleteCategoryController";
import { DeleteCategoryUseCase } from "./DeleteCategoryUsecase";


const categoryFactory = new CategoryPrismaFactory();
const categoryRepository = new CategoryPrismaRepository(categoryFactory);
const deleteCategoryService = new DeleteCategoryService(categoryRepository);
const deleteCategoryUseCase = new DeleteCategoryUseCase(deleteCategoryService);
const deleteCategoryController = new DeleteCategoryController(
    deleteCategoryUseCase,
);

export { deleteCategoryController };

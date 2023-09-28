import { CategoryPrismaFactory } from "../../factories/CategoryPrismaFactory";
import { CategoryPrismaRepository } from "../../repositories/implementations/CategoryRepository";
import { DeleteCategoryController } from "./DeleteCategoryController";
import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";

const categoryFactory = new CategoryPrismaFactory();
const categoryRepository = new CategoryPrismaRepository(categoryFactory);
const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);
const deleteCategoryController = new DeleteCategoryController(
    deleteCategoryUseCase,
);

export { deleteCategoryController };

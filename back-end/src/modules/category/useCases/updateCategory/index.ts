import { CategoryPrismaFactory } from "../../factories/CategoryPrismaFactory";
import { CategoryPrismaRepository } from "../../repositories/implementations/CategoryRepository";
import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";
import { UpdateCategoryController } from "./UpdateCategoryController";
import { UpdateCategoryService } from "../../services/validation/UpdateCategoryService";

const categoryFactory = new CategoryPrismaFactory();
const categoryRepository = new CategoryPrismaRepository(categoryFactory);
const updateCategoryService = new UpdateCategoryService(categoryRepository);

const updateCategoryUseCase = new UpdateCategoryUseCase(
    categoryRepository,
    updateCategoryService,
);

const updateCategoryController = new UpdateCategoryController(
    updateCategoryUseCase,
);

export { updateCategoryController };

import { CategoryPrismaFactory } from "../../factories/CategoryPrismaFactory";
import { CategoryPrismaRepository } from "../../repositories/implementations/CategoryRepository";
import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";
import { UpdateCategoryController } from "./UpdateCategoryController";
import { UpdateCategoryService } from "../../services/UpdateCategoryService";
import { UpdateCategoryValidator } from "../../services/validation/UpdateCategoryValidate";

const categoryFactory = new CategoryPrismaFactory();
const categoryRepository = new CategoryPrismaRepository(categoryFactory);
const updateCategoryValidator = new UpdateCategoryValidator(categoryRepository);
const updateCategoryService = new UpdateCategoryService(
    categoryRepository,
    updateCategoryValidator,
);

const updateCategoryUseCase = new UpdateCategoryUseCase(updateCategoryService);

const updateCategoryController = new UpdateCategoryController(
    updateCategoryUseCase,
);

export { updateCategoryController };

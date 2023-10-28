import { CategoryPrismaFactory } from "../../factories/CategoryPrismaFactory";
import { CategoryPrismaRepository } from "../../repositories/implementations/CategoryRepository";
import { UpdateCategoryService } from "../../services/UpdateCategoryService";
import { UpdateCategoryValidator } from "../../services/validation/UpdateCategoryValidate";
import { UpdateCategoryController } from "./UpdateCategoryController";
import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";

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

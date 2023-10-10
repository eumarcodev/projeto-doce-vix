import { CategoryPrismaFactory } from "../../factories/CategoryPrismaFactory";
import { CategoryPrismaRepository } from "../../repositories/implementations/CategoryRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { CreateCategoryValidator } from "../../services/validation/CreateCategoryValidate";
import { CreateCategoryService } from "../../services/CreateCategoryService";

const categoryFacotry = new CategoryPrismaFactory();
const categoryRepository = new CategoryPrismaRepository(categoryFacotry);
const createCategoryValidator = new CreateCategoryValidator(categoryRepository);
const createCategoryService = new CreateCategoryService(
    categoryRepository,
    createCategoryValidator,
);
const createCategoryUseCase = new CreateCategoryUseCase(createCategoryService);
const createCategoryController = new CreateCategoryController(
    createCategoryUseCase,
);

export { createCategoryController };

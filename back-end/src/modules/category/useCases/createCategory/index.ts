import { CategoryPrismaFactory } from "../../factories/CategoryPrismaFactory";
import { CategoryPrismaRepository } from "../../repositories/implementations/CategoryRepository";
import { CreateCategoryService } from "../../services/CreateCategoryService";
import { CreateCategoryValidator } from "../../services/validation/CreateCategoryValidate";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

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

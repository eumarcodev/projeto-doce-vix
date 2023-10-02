import { CategoryPrismaFactory } from "../../factories/CategoryPrismaFactory";
import { CategoryPrismaRepository } from "../../repositories/implementations/CategoryRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { CreateCategoryValidator } from "../../services/validation/CreateCategoryValidate";

const categoryFacotry = new CategoryPrismaFactory();
const categoryRepository = new CategoryPrismaRepository(categoryFacotry);
const createCategoryService = new CreateCategoryValidator(categoryRepository);
const createCategoryUseCase = new CreateCategoryUseCase(
    categoryRepository,
    createCategoryService,
);
const createCategoryController = new CreateCategoryController(
    createCategoryUseCase,
);

export { createCategoryController };


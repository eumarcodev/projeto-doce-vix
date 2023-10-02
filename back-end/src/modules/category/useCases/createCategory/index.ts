import { CategoryPrismaFactory } from "../../factories/CategoryPrismaFactory";
import { CategoryPrismaRepository } from "../../repositories/implementations/CategoryRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { CreateCategoryService } from "../../services/validation/CreateCategoryService";

const categoryFacotry = new CategoryPrismaFactory();
const categoryRepository = new CategoryPrismaRepository(categoryFacotry);
const createCategoryService = new CreateCategoryService(categoryRepository);
const createCategoryUseCase = new CreateCategoryUseCase(
    categoryRepository,
    createCategoryService,
);
const createCategoryController = new CreateCategoryController(
    createCategoryUseCase,
);

export { createCategoryController };

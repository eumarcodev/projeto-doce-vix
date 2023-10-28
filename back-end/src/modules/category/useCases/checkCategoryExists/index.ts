import { CategoryPrismaFactory } from "../../factories/CategoryPrismaFactory";
import { CategoryPrismaRepository } from "../../repositories/implementations/CategoryRepository";
import { CheckCategoryExistsController } from "./CheckCategoryExistsController";
import { CheckCategoryExistsUseCase } from "./CheckCategoryExistsUseCase";

const categoryFactory = new CategoryPrismaFactory();
const categoryRepository = new CategoryPrismaRepository(categoryFactory);
const checkCategoryExistsUseCase = new CheckCategoryExistsUseCase(
    categoryRepository,
);

const checkCategoryExistsController = new CheckCategoryExistsController(
    checkCategoryExistsUseCase,
);

export { checkCategoryExistsController };

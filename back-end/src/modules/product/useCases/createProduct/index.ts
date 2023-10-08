import { CategoryPrismaFactory } from "@/modules/category/factories/CategoryPrismaFactory";
import { CategoryPrismaRepository } from "@/modules/category/repositories/implementations/CategoryRepository";
import { DayOfWeekPrismaFactory } from "@/modules/dayOfWeek/factories/DayOfWeekPrismaFactory";
import { DayOfWeekPrismaRepository } from "@/modules/dayOfWeek/repositories/implementations/DayOfWeekRepository";

import { ProductPrismaFactory } from "../../factories/ProductPrismaFactory";
import { ProductPrismaRepository } from "../../repositories/implementations/ProductRepository";
import { CreateProductController } from "./CreateProductController";
import { CreateProductUseCase } from "./CreateProductUseCase";
import { CreateProductService } from "../../services/CreateProductService";
import { DayOfWeekCheckExistsValidator } from "@/modules/dayOfWeek/services/validation/DayOfWeekCheckExistsValidator";
import { CreateCategoryValidator } from "@/modules/category/services/validation/CreateCategoryValidate";
import { CreateProductValidator } from "../../services/validation/CreateProductValidator";

const productFactory = new ProductPrismaFactory();
const productRepository = new ProductPrismaRepository(productFactory);

const categoryFactory = new CategoryPrismaFactory();
const categoryRepository = new CategoryPrismaRepository(categoryFactory);

const dayOfWeekFactory = new DayOfWeekPrismaFactory();
const dayOfWeekRepository = new DayOfWeekPrismaRepository(dayOfWeekFactory);

const createCategoryValidator = new CreateCategoryValidator(categoryRepository);
const dayOfWeekCheckExistsValidator = new DayOfWeekCheckExistsValidator(
    dayOfWeekRepository,
);

const createProductValidator = new CreateProductValidator(productRepository);

const createProductService = new CreateProductService(
    createCategoryValidator,
    dayOfWeekCheckExistsValidator,
    createProductValidator,
    productRepository,
);
const createProductUseCase = new CreateProductUseCase(createProductService);
const createProductController = new CreateProductController(
    createProductUseCase,
);

export { createProductController };

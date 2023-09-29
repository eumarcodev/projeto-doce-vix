import { CategoryPrismaFactory } from "@/modules/category/factories/CategoryPrismaFactory";
import { CategoryPrismaRepository } from "@/modules/category/repositories/implementations/CategoryRepository";
import { DayOfWeekPrismaFactory } from "@/modules/dayOfWeek/factories/DayOfWeekPrismaFactory";
import { DayOfWeekPrismaRepository } from "@/modules/dayOfWeek/repositories/implementations/DayOfWeekRepository";

import { ProductPrismaFactory } from "../../factories/ProductPrismaFactory";
import { ProductPrismaRepository } from "../../repositories/implementations/ProductRepository";
import { CreateProductController } from "./CreateProductController";
import { CreateProductUseCase } from "./CreateProductUseCase";

const productFactory = new ProductPrismaFactory();
const productRepository = new ProductPrismaRepository(productFactory);

const categoryFactory = new CategoryPrismaFactory();
const categoryRepository = new CategoryPrismaRepository(categoryFactory);

const dayOfWeekFactory = new DayOfWeekPrismaFactory();
const dayOfWeekRepository = new DayOfWeekPrismaRepository(dayOfWeekFactory);
const createProductUseCase = new CreateProductUseCase(
    categoryRepository,
    dayOfWeekRepository,
    productRepository,
);
const createProductController = new CreateProductController(
    createProductUseCase,
);

export { createProductController };

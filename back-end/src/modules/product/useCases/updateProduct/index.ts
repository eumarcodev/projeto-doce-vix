import { CategoryPrismaFactory } from "@/modules/category/factories/CategoryPrismaFactory";
import { CategoryPrismaRepository } from "@/modules/category/repositories/implementations/CategoryRepository";
import { DayOfWeekPrismaFactory } from "@/modules/dayOfWeek/factories/DayOfWeekPrismaFactory";
import { DayOfWeekPrismaRepository } from "@/modules/dayOfWeek/repositories/implementations/DayOfWeekRepository";

import { ProductPrismaFactory } from "../../factories/ProductPrismaFactory";
import { ProductPrismaRepository } from "../../repositories/implementations/ProductRepository";
import { UpdateProductUseCase } from "./UpdateProductUseCase";
import { UpdateProductController } from "./UpdateProductController";
import { UpdateProductService } from "../../services/validation/UpdateProductService";

const productFactory = new ProductPrismaFactory();
const productRepository = new ProductPrismaRepository(productFactory);

const categoryFactory = new CategoryPrismaFactory();
const categoryRepository = new CategoryPrismaRepository(categoryFactory);

const dayOfWeekFactory = new DayOfWeekPrismaFactory();
const dayOfWeekRepository = new DayOfWeekPrismaRepository(dayOfWeekFactory);

const updateProductService = new UpdateProductService(
    categoryRepository,
    productRepository,
    dayOfWeekRepository,
);

const updateProductUseCase = new UpdateProductUseCase(
    productRepository,
    updateProductService,
);
const updateProductController = new UpdateProductController(
    updateProductUseCase,
);

export { updateProductController };

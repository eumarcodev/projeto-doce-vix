import { CategoryPrismaFactory } from "@/modules/category/factories/CategoryPrismaFactory";
import { CategoryPrismaRepository } from "@/modules/category/repositories/implementations/CategoryRepository";
import { DayOfWeekPrismaFactory } from "@/modules/dayOfWeek/factories/DayOfWeekPrismaFactory";
import { DayOfWeekPrismaRepository } from "@/modules/dayOfWeek/repositories/implementations/DayOfWeekRepository";

import { ProductPrismaFactory } from "../../factories/ProductPrismaFactory";
import { ProductPrismaRepository } from "../../repositories/implementations/ProductRepository";
import { UpdateProductService } from "../../services/UpdateProductService";
import { UpdateProductValidator } from "../../services/validation/UpdateProductValidator";
import { UpdateProductController } from "./UpdateProductController";
import { UpdateProductUseCase } from "./UpdateProductUseCase";

const productFactory = new ProductPrismaFactory();
const productRepository = new ProductPrismaRepository(productFactory);

const categoryFactory = new CategoryPrismaFactory();
const categoryRepository = new CategoryPrismaRepository(categoryFactory);

const dayOfWeekFactory = new DayOfWeekPrismaFactory();
const dayOfWeekRepository = new DayOfWeekPrismaRepository(dayOfWeekFactory);

const updateProductValidator = new UpdateProductValidator(
    categoryRepository,
    productRepository,
    dayOfWeekRepository,
);

const updateProductService = new UpdateProductService(
    updateProductValidator,
    productRepository,
);

const updateProductUseCase = new UpdateProductUseCase(updateProductService);
const updateProductController = new UpdateProductController(
    updateProductUseCase,
);

export { updateProductController };

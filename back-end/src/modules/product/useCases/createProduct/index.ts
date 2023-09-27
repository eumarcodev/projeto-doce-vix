import { ProductPrismaFactory } from "../../factories/ProductPrismaFactory";
import { ProductPrismaRepository } from "../../repositories/implementations/ProductRepository";
import { CreateProductUseCase } from "./CreateProductUseCase";
import { CreateProductController } from "./CreateProductController";

const productFactory = new ProductPrismaFactory();
const productRepository = new ProductPrismaRepository(productFactory);
const createProductUseCase = new CreateProductUseCase(productRepository);
const createProductController = new CreateProductController(
    createProductUseCase,
);

export { createProductController };

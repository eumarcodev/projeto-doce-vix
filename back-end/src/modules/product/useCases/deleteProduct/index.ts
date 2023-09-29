import { ProductPrismaFactory } from "../../factories/ProductPrismaFactory";
import { ProductPrismaRepository } from "../../repositories/implementations/ProductRepository";
import { DeleteProductController } from "./DeleteProductController";
import { DeleteProductUseCase } from "./DeleteProductUseCase";

const productFactory = new ProductPrismaFactory();
const productRepository = new ProductPrismaRepository(productFactory);

const deleteProductUseCase = new DeleteProductUseCase(productRepository);
const deleteProductController = new DeleteProductController(
    deleteProductUseCase,
);

export { deleteProductController };

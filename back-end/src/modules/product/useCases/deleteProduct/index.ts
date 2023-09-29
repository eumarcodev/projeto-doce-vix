import { ProductPrismaRepository } from "../../repositories/implementations/ProductRepository";
import { ProductPrismaFactory } from "../../factories/ProductPrismaFactory";
import { DeleteProductUseCase } from "./DeleteProductUseCase";
import { DeleteProductController } from "./DeleteProductController";

const productFactory = new ProductPrismaFactory();
const productRepository = new ProductPrismaRepository(productFactory);

const deleteProductUseCase = new DeleteProductUseCase(productRepository);
const deleteProductController = new DeleteProductController(
    deleteProductUseCase,
);

export { deleteProductController };

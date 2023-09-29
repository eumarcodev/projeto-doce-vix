import { ProductPrismaFactory } from "../../factories/ProductPrismaFactory";
import { ProductPrismaRepository } from "../../repositories/implementations/ProductRepository";
import { UpdateProductUseCase } from "./UpdateProductUseCase";
import { UpdateProductController } from "./UpdateProductController";

const productFactory = new ProductPrismaFactory();
const productRepository = new ProductPrismaRepository(productFactory);
const updateProduct = new UpdateProductUseCase(productRepository);
const updateProductController = new UpdateProductController(updateProduct);

export { updateProductController };

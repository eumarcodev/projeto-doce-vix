import { ProductPrismaFactory } from "../../factories/ProductPrismaFactory";
import { ProductPrismaRepository } from "../../repositories/implementations/ProductRepository";
import { DeleteProductController } from "./DeleteProductController";
import { DeleteProductUseCase } from "./DeleteProductUseCase";
import { DeleteProcutService } from "../../services/DeleteProductService";

const productFactory = new ProductPrismaFactory();
const productRepository = new ProductPrismaRepository(productFactory);

const deleteProductService = new DeleteProcutService(productRepository);

const deleteProductUseCase = new DeleteProductUseCase(deleteProductService);
const deleteProductController = new DeleteProductController(
    deleteProductUseCase,
);

export { deleteProductController };

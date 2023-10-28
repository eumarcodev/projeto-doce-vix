import { ProductPrismaFactory } from "../../factories/ProductPrismaFactory";
import { ProductPrismaRepository } from "../../repositories/implementations/ProductRepository";
import { DeleteProcutService } from "../../services/DeleteProductService";
import { DeleteProductController } from "./DeleteProductController";
import { DeleteProductUseCase } from "./DeleteProductUseCase";

const productFactory = new ProductPrismaFactory();
const productRepository = new ProductPrismaRepository(productFactory);

const deleteProductService = new DeleteProcutService(productRepository);

const deleteProductUseCase = new DeleteProductUseCase(deleteProductService);
const deleteProductController = new DeleteProductController(
    deleteProductUseCase,
);

export { deleteProductController };

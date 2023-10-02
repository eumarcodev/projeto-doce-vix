import { ProductPrismaFactory } from "../../factories/ProductPrismaFactory";
import { ProductPrismaRepository } from "../../repositories/implementations/ProductRepository";
import { DeleteProductController } from "./DeleteProductController";
import { DeleteProductUseCase } from "./DeleteProductUseCase";
import { DeleteProductService } from "../../services/validation/DeleteProductService";

const productFactory = new ProductPrismaFactory();
const productRepository = new ProductPrismaRepository(productFactory);

const deleteProductService = new DeleteProductService(productRepository);

const deleteProductUseCase = new DeleteProductUseCase(
    productRepository,
    deleteProductService,
);
const deleteProductController = new DeleteProductController(
    deleteProductUseCase,
);

export { deleteProductController };

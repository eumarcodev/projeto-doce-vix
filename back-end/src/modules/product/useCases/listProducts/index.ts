import { CurrentPageValidation } from "@/shared/utils/pagination/adapters/implementations/CurrentPageValidation";
import { OffsetGenerator } from "@/shared/utils/pagination/adapters/implementations/Offset";
import { TotalPagesGenerator } from "@/shared/utils/pagination/adapters/implementations/TotalPagesGenerator";
import { Sorting } from "@/shared/utils/tools/adapters/implementations/Sorting";
import { ProductPrismaFactory } from "../../factories/ProductPrismaFactory";
import { ProductPrismaRepository } from "../../repositories/implementations/ProductRepository";
import { ListProductUseCase } from "./ListProductUseCase";
import { ListProductsController } from "./ListProductController";

const productFactory = new ProductPrismaFactory();
const productRepository = new ProductPrismaRepository(productFactory);
const sorting = new Sorting();
const offsetGenerator = new OffsetGenerator();
const totalPagesGenerator = new TotalPagesGenerator();
const currentPageValidation = new CurrentPageValidation();
const listProductUseCase = new ListProductUseCase(
    productRepository,
    sorting,
    offsetGenerator,
    totalPagesGenerator,
    currentPageValidation,
);

const listProductsController = new ListProductsController(listProductUseCase);

export { listProductsController };

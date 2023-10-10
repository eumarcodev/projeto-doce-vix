import { CurrentPageValidation } from "@/shared/utils/pagination/adapters/implementations/CurrentPageValidation";
import { OffsetGenerator } from "@/shared/utils/pagination/adapters/implementations/Offset";
import { TotalPagesGenerator } from "@/shared/utils/pagination/adapters/implementations/TotalPagesGenerator";
import { Sorting } from "@/shared/utils/tools/adapters/implementations/Sorting";

import { CategoryPrismaFactory } from "../../factories/CategoryPrismaFactory";
import { CategoryPrismaRepository } from "../../repositories/implementations/CategoryRepository";
import { ListCategoryController } from "./ListCategoryController";
import { ListCategoryUseCase } from "./ListCategoryUseCase";

const categoryFactory = new CategoryPrismaFactory();
const categoryRepository = new CategoryPrismaRepository(categoryFactory);
const sorting = new Sorting();
const offsetGenerator = new OffsetGenerator();
const totalPagesGenerator = new TotalPagesGenerator();
const currentPageValidation = new CurrentPageValidation();
const listCategoryUseCase = new ListCategoryUseCase(
    categoryRepository,
    sorting,
    offsetGenerator,
    totalPagesGenerator,
    currentPageValidation,
);

const listCategoryController = new ListCategoryController(listCategoryUseCase);

export { listCategoryController };

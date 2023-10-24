import { CurrentPageValidation } from "@/shared/utils/pagination/adapters/implementations/CurrentPageValidation";
import { OffsetGenerator } from "@/shared/utils/pagination/adapters/implementations/Offset";
import { TotalPagesGenerator } from "@/shared/utils/pagination/adapters/implementations/TotalPagesGenerator";
import { Sorting } from "@/shared/utils/tools/adapters/implementations/Sorting";

import { OrderPrismaFactory } from "../../factories/OrderPrismaFactory";
import { OrderPrismaRepository } from "../../repositories/implementations/OrderPrismaRepository";
import { ListOrdersController } from "./ListOrdersController";
import { ListOrdersUseCase } from "./ListOrdersUseCase";

const orderPrismaFactory = new OrderPrismaFactory();
const orderPrismaRepository = new OrderPrismaRepository(orderPrismaFactory);
const sorting = new Sorting();
const offsetGenerator = new OffsetGenerator();
const totalPagesGenerator = new TotalPagesGenerator();
const currentPageValidation = new CurrentPageValidation();
const listOrdersUseCase = new ListOrdersUseCase(
    orderPrismaRepository,
    sorting,
    offsetGenerator,
    totalPagesGenerator,
    currentPageValidation,
);
const listOrdersController = new ListOrdersController(listOrdersUseCase);

export { listOrdersController };

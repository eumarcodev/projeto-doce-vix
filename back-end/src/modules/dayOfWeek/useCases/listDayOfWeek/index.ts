import { CurrentPageValidation } from "@/shared/utils/pagination/adapters/implementations/CurrentPageValidation";
import { OffsetGenerator } from "@/shared/utils/pagination/adapters/implementations/Offset";
import { TotalPagesGenerator } from "@/shared/utils/pagination/adapters/implementations/TotalPagesGenerator";
import { Sorting } from "@/shared/utils/tools/adapters/implementations/Sorting";

import { DayOfWeekPrismaFactory } from "../../factories/DayOfWeekPrismaFactory";
import { DayOfWeekPrismaRepository } from "../../repositories/implementations/DayOfWeekRepository";
import { ListDayOfWeekUseCase } from "./ListDayOfWeekUseCase";
import { ListDayOfWeekController } from "./ListDayOfWeekUseController";

const dayOfWeekFactory = new DayOfWeekPrismaFactory();
const dayOfWeekyRepository = new DayOfWeekPrismaRepository(dayOfWeekFactory);
const sorting = new Sorting();
const offsetGenerator = new OffsetGenerator();
const totalPagesGenerator = new TotalPagesGenerator();
const currentPageValidation = new CurrentPageValidation();
const listDayOfWeekUseCase = new ListDayOfWeekUseCase(
    dayOfWeekyRepository,
    sorting,
    offsetGenerator,
    totalPagesGenerator,
    currentPageValidation,
);

const listDayOfWeekController = new ListDayOfWeekController(
    listDayOfWeekUseCase,
);

export { listDayOfWeekController };

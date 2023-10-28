import { CurrentPageValidation } from "@/shared/utils/pagination/adapters/implementations/CurrentPageValidation";
import { OffsetGenerator } from "@/shared/utils/pagination/adapters/implementations/Offset";
import { TotalPagesGenerator } from "@/shared/utils/pagination/adapters/implementations/TotalPagesGenerator";
import { Sorting } from "@/shared/utils/tools/adapters/implementations/Sorting";

import { FilePrismaFactory } from "../../factories/FilePrismaFactory";
import { FileRepository } from "../../repositories/implementations/FileRepository";
import { ListFilesController } from "./ListFIlesController";
import { ListFilesUseCase } from "./ListFilesUseCase";

const filePrismaFactory = new FilePrismaFactory();
const fileRepository = new FileRepository(filePrismaFactory);
const sorting = new Sorting();
const offsetGenerator = new OffsetGenerator();
const totalPagesGenerator = new TotalPagesGenerator();
const currentPageValidation = new CurrentPageValidation();
const listFilesUseCase = new ListFilesUseCase(
    fileRepository,
    sorting,
    offsetGenerator,
    totalPagesGenerator,
    currentPageValidation,
);
const listFilesController = new ListFilesController(listFilesUseCase);

export { listFilesController };

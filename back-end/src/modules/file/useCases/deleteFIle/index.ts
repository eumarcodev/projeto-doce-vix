import { FilePrismaFactory } from "../../factories/FilePrismaFactory";
import { FileRepository } from "../../repositories/implementations/FileRepository";
import { DeleteFileController } from "./DeleteFileController";
import { DeleteFileUseCase } from "./DeleteFIleUseCase";

const filePrismaFactory = new FilePrismaFactory();
const fileRepository = new FileRepository(filePrismaFactory);
const deleteFileUseCase = new DeleteFileUseCase(fileRepository);
const deleteFileController = new DeleteFileController(deleteFileUseCase);

export { deleteFileController };

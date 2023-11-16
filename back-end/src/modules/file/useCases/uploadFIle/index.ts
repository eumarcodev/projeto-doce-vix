import { FilePrismaFactory } from "../../factories/FilePrismaFactory";
import { FileRepository } from "../../repositories/implementations/FileRepository";
import { UploadFileController } from "./UploadFIleController";
import { UploadFileUseCase } from "./UploadFIleUseCase";

const fileFactory = new FilePrismaFactory();
const fileRepository = new FileRepository(fileFactory);
const uploadFileUseCase = new UploadFileUseCase(fileRepository);
const uploadFIleController = new UploadFileController(uploadFileUseCase);
export { uploadFIleController };

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { IUseCase } from "@/shared/infra/protocols/IUseCase";
import { IFile } from "../../model/IFile";
import { IFileRepository } from "../../repositories/IFileRepository";

export class UploadFileUseCase implements IUseCase<Express.Multer.File, IFile> {
    constructor(private readonly fileRepository: IFileRepository) { }

    async execute(path: Express.Multer.File): Promise<IFile> {
        const files = await this.fileRepository.saveFile(path)

        if (!files)
            throw new ErrorHandler(
                "Error on upload file",
                HttpStatusCode.BAD_REQUEST,
            );

        return files;
    }
}
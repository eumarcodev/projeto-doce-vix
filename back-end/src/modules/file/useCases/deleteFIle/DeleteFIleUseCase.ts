import { IUseCase } from "@/shared/infra/protocols/IUseCase";

import { IFile } from "../../model/IFile";
import { IFileRepository } from "../../repositories/IFileRepository";

export class DeleteFileUseCase implements IUseCase<string, IFile> {
    constructor(private readonly fileRepository: IFileRepository) {}

    async execute(guid: string): Promise<IFile> {
        const file = await this.fileRepository.deleteFile(guid);

        if (!file) throw new Error("File not found");

        return file;
    }
}

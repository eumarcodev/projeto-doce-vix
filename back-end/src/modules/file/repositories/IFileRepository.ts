import { IFile } from "../model/IFile";

interface IFileRepository {
    saveFile(path: Express.Multer.File): Promise<IFile | undefined>
}

export { IFileRepository };

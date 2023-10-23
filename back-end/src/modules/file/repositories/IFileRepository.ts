import { IFile } from "../model/IFile";

interface IUpdateFileDTO {
    id: string;
    path: string | Express.Multer.File;
}

interface IListFileResponse {
    files: IFile[];
    count: number;
}

interface IListFileRequest {
    search?: string;
    limit?: number;
    offset?: number;
}



interface IFileRepository {
    findById(id: string): Promise<IFile | undefined>;
    saveFile(path: Express.Multer.File): Promise<IFile | undefined>
    updateFile({ id, path }: IUpdateFileDTO): Promise<IFile | undefined>;
    deleteFile(id: string): Promise<IFile | undefined>;
    list({ search, limit, offset }: IListFileRequest): Promise<IListFileResponse | undefined>;
}

export { IFileRepository, IListFileRequest, IListFileResponse, IUpdateFileDTO };


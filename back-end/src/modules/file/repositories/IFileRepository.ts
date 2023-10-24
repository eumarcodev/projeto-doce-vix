import { IFile } from "../model/IFile";

interface IUpdateFileDTO {
    guid: string;
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
    findById(guid: string): Promise<IFile | undefined>;
    saveFile(path: Express.Multer.File): Promise<IFile | undefined>;
    updateFile({ guid, path }: IUpdateFileDTO): Promise<IFile | undefined>;
    deleteFile(guid: string): Promise<IFile | undefined>;
    list({
        search,
        limit,
        offset,
    }: IListFileRequest): Promise<IListFileResponse | undefined>;
}

export { IFileRepository, IListFileRequest, IListFileResponse, IUpdateFileDTO };

import { IFile } from "../model/IFile";

interface IUpdateFileDTO {
    guid: string;
    path: string;
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
    create(path: string): Promise<IFile | undefined>;
    update({ path, guid }: IUpdateFileDTO): Promise<IFile | undefined>;
    delete(path: string): Promise<IFile | undefined>;
    list({
        search,
        limit,
        offset,
    }: IListFileRequest): Promise<IListFileResponse | undefined>;
    findByGuid(guid: string): Promise<IListFileResponse | undefined>;
}

export { IUpdateFileDTO, IListFileResponse, IListFileRequest, IFileRepository };

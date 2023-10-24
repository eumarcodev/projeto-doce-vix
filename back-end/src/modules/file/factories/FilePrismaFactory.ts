import { IDefaultFactory } from "@/shared/infra/factories/IDefaultFactory";
import { File as PFile } from "@prisma/client";

import { IFile } from "../model/IFile";

export interface IFilePrisma extends PFile {}

export class FilePrismaFactory implements IDefaultFactory<IFilePrisma, IFile> {
    async generate(entity: IFilePrisma): Promise<IFile> {
        const result = {
            id: entity.id,
            guid: entity.guid,
            path: entity.path,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };

        return result;
    }
}

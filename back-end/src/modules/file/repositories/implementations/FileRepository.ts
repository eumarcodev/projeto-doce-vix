import { context } from "@/shared/infra/database/Context";
import { IDefaultFactory } from "@/shared/infra/factories/IDefaultFactory";
import { PrismaClient } from "@prisma/client";
import { IFilePrisma } from "../../factories/FilePrismaFactory";
import { IFile } from "../../model/IFile";
import { IFileRepository } from "../IFileRepository";


class FileRepository implements IFileRepository {
    private prismaClient: PrismaClient;

    constructor(
        private readonly filePrismaRepository: IDefaultFactory<
            IFilePrisma,
            IFile
        >,

    ) {
        this.prismaClient = context.prisma;
    }

    async saveFile(file: Express.Multer.File): Promise<IFile | undefined> {
        const filePath = file.path

        const fileP = await this.prismaClient.file.create({
            data: {
                path: filePath,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        })
        if (!fileP) return undefined

        return this.filePrismaRepository.generate(fileP);
    }



}

export { FileRepository };

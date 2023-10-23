import { context } from "@/shared/infra/database/Context";
import { IDefaultFactory } from "@/shared/infra/factories/IDefaultFactory";
import { PrismaClient } from "@prisma/client";
import { IFilePrisma } from "../../factories/FilePrismaFactory";
import { IFile } from "../../model/IFile";
import { IFileRepository, IListFileRequest, IListFileResponse, IUpdateFileDTO } from "../IFileRepository";


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

    async findById(id: string): Promise<IFile | undefined> {
        const fileP = await this.prismaClient.file.findUnique({
            where: {
                id
            }
        })
        if (!fileP) return undefined

        return this.filePrismaRepository.generate(fileP);
    }

    async deleteFile(id: string): Promise<IFile | undefined> {
        const fileP = await this.prismaClient.file.delete({
            where: {
                id
            }
        })
        if (!fileP) return undefined

        return fileP;

    }

    async updateFile({ id, path }: IUpdateFileDTO): Promise<IFile | undefined> {
        const fileP = await this.prismaClient.file.update({
            where: {
                id
            },
            data: {
                path: path.toString()
            }
        })

        if (!fileP) return undefined

        return this.filePrismaRepository.generate(fileP);
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

    async list({
        search,
        limit,
        offset,
    }: IListFileRequest): Promise<IListFileResponse | undefined> {
        const where = search
            ? {
                OR: [
                    {
                        path: {
                            contains: search,
                        },
                    }
                ],
            }
            : undefined;

        const count = await this.prismaClient.file.count({
            where,
        });

        const filesP = await this.prismaClient.file.findMany({
            where,
            take: limit,
            skip: offset,
        });

        if (!filesP) return undefined;

        const files = await Promise.all(
            filesP.map(async (fileP) => {
                return this.filePrismaRepository.generate(fileP);
            }),
        );

        return {
            files,
            count,
        };
    }



}

export { FileRepository };

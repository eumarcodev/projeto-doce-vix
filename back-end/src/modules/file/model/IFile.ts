export interface IFile {
    id: number;
    guid: string;
    path: string | Express.Multer.File;
    createdAt: Date;
    updatedAt: Date;
}

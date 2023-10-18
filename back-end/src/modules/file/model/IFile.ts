export interface IFile {
    id: string;
    guid: string;
    path: string | Express.Multer.File;
    createdAt: Date;
    updatedAt: Date;
}

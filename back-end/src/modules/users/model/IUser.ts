export interface IUser {
    id: number;
    guid: string;
    name: string;
    email: string;
    role: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

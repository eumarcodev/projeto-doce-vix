import { IUser } from "../model/IUser";

interface ICreateUserDTO {
    name: string;
    email: string;
    encryptedPassword: string;
}

interface IUpdateUserDTO {
    guid: string;
    name?: string;
    email?: string;
    encryptedPassword: string;
}

interface IListUsersResponse {
    users: IUser[];
    count: number;
}

interface IListUsersRequest {
    search?: string;
    limit?: number;
    offset?: number;
}

interface IUserRepository {
    findByMail(email: string): Promise<IUser | undefined>;
    create({
        name,
        email,
        encryptedPassword,
    }: ICreateUserDTO): Promise<IUser | undefined>;
    update({
        guid,
        name,
        email,
        encryptedPassword,
    }: IUpdateUserDTO): Promise<IUser | undefined>;
    list({
        search,
        limit,
        offset,
    }: IListUsersRequest): Promise<IListUsersResponse | undefined>;
    findByGuid(guid: string): Promise<IUser | undefined>;
}

export {
    ICreateUserDTO,
    IUpdateUserDTO,
    IListUsersResponse,
    IListUsersRequest,
    IUserRepository,
};

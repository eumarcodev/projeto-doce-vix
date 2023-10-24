import { IUser } from "../model/IUser";

interface ICreateUserDTO {
    name: string;
    email: string;
    password: string;
}

interface IUpdateUserDTO {
    guid: string;
    name?: string;
    email?: string;
    password: string;
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
    findById(id: number): Promise<IUser | undefined>;
    findByMail(email: string): Promise<IUser | undefined>;
    create({
        name,
        email,
        password,
    }: ICreateUserDTO): Promise<IUser | undefined>;
    update({
        guid,
        name,
        email,
        password,
    }: IUpdateUserDTO): Promise<IUser | undefined>;
    delete(guid: string): Promise<IUser | undefined>;
    list({
        search,
        limit,
        offset,
    }: IListUsersRequest): Promise<IListUsersResponse | undefined>;
    findByGuid(guid: string): Promise<IUser | undefined>;
}

export {
    ICreateUserDTO,
    IListUsersRequest,
    IListUsersResponse,
    IUpdateUserDTO,
    IUserRepository,
};

import { PrismaClient } from "@prisma/client";
import { context } from "@/shared/infra/database/Context";
import {
    ICreateUserDTO,
    IListUsersRequest,
    IListUsersResponse,
    IUpdateUserDTO,
    IUserRepository,
} from "../IUserRepository";
import { IDefaultFactory } from "@/shared/infra/factories/IDefaultFactory";
import { IUserPrisma } from "../../factories/UserPrismaFactory";
import { IUser } from "../../model/IUser";

class UserPrismaRepository implements IUserRepository {
    private prismaClient: PrismaClient;

    constructor(
        private readonly userPrismaFactory: IDefaultFactory<IUserPrisma, IUser>,
    ) {
        this.prismaClient = context.prisma;
    }

    async findByMail(email: string): Promise<IUser | undefined> {
        const usersP = await this.prismaClient.user.findFirst({
            where: {
                email,
            },
        });

        if (!usersP) return undefined;

        return this.userPrismaFactory.generate(usersP);
    }

    async create({
        name,
        email,
        password,
    }: ICreateUserDTO): Promise<IUser | undefined> {
        const userP = await this.prismaClient.user.create({
            data: {
                name,
                email,
                password,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });

        if (!userP) return undefined;

        return this.userPrismaFactory.generate(userP);
    }

    async update({
        guid,
        name,
        email,
        password,
    }: IUpdateUserDTO): Promise<IUser | undefined> {
        const userP = await this.prismaClient.user.update({
            where: {
                guid,
            },
            data: {
                guid,
                name,
                email,
                password,
            },
        });

        if (!userP) return undefined;

        return this.userPrismaFactory.generate(userP);
    }

    async delete(guid: string): Promise<IUser | undefined> {
        const userP = await this.prismaClient.user.delete({
            where: {
                guid,
            },
        });

        if (!userP) return undefined;

        return this.userPrismaFactory.generate(userP);
    }

    async list({
        search,
        limit,
        offset,
    }: IListUsersRequest): Promise<IListUsersResponse | undefined> {
        const where = search
            ? {
                  OR: [
                      {
                          name: {
                              contains: search,
                          },
                      },
                      {
                          description: {
                              contains: search,
                          },
                      },
                  ],
              }
            : undefined;

        const count = await this.prismaClient.user.count({
            where,
        });

        const usersP = await this.prismaClient.user.findMany({
            where,
            take: limit,
            skip: offset,
        });

        if (!usersP) return undefined;

        const users = await Promise.all(
            usersP.map(async (userP) => {
                return this.userPrismaFactory.generate(userP);
            }),
        );

        return {
            users,
            count,
        };
    }

    async findByGuid(guid: string): Promise<IUser | undefined> {
        const usersP = await this.prismaClient.user.findUnique({
            where: {
                guid,
            },
        });

        if (!usersP) return undefined;

        return this.userPrismaFactory.generate(usersP);
    }
}

export { UserPrismaRepository };

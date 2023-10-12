import { PrismaClient } from "@prisma/client";
import { context } from "@/shared/infra/database/Context";
import { IDefaultFactory } from "@/shared/infra/factories/IDefaultFactory";
import { IRefreshToken } from "../../model/IRefreshToken";
import { IRefreshTokenPrisma } from "../../factories/RefreshTokenPrismaFactory";
import {
    IRefreshTokenRepository,
    ISaveRefreshTokenDTO,
} from "../IRefreshTokenRepository";
import dayjs from "dayjs";

class RefreshTokenPrismaRepository implements IRefreshTokenRepository {
    private prismaClient: PrismaClient;

    constructor(
        private readonly refreshTokenPrismaFactory: IDefaultFactory<
            IRefreshTokenPrisma,
            IRefreshToken
        >,
    ) {
        this.prismaClient = context.prisma;
    }

    async findById(id: number): Promise<IRefreshToken | undefined> {
        const refreshTokenP = await this.prismaClient.refreshToken.findFirst({
            where: {
                id,
            },
        });

        if (!refreshTokenP) return undefined;

        return this.refreshTokenPrismaFactory.generate(refreshTokenP);
    }

    async findByUserId(userId: number): Promise<IRefreshToken | undefined> {
        const refreshTokenP = await this.prismaClient.refreshToken.findFirst({
            where: {
                userId,
            },
        });

        if (!refreshTokenP) return undefined;

        return this.refreshTokenPrismaFactory.generate(refreshTokenP);
    }

    async save({
        userId,
    }: ISaveRefreshTokenDTO): Promise<IRefreshToken | undefined> {
        const expireIn = dayjs().add(12, "second").toDate();
        const refreshTokenP = await this.prismaClient.refreshToken.create({
            data: { 
                userId,
                expireIn,
                createdAt: new Date(),
                updatedAt: new Date(),
                
            },
        });

        if (!refreshTokenP) return undefined;

        return this.refreshTokenPrismaFactory.generate(refreshTokenP);
    }

    async deleteAll(userId: number): Promise<void>{
        await this.prismaClient.refreshToken.deleteMany({
            where: {
                userId
            }
        })
        
    }
}

export { RefreshTokenPrismaRepository };
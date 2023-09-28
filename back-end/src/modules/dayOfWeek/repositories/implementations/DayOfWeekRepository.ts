import { PrismaClient } from "@prisma/client";
import {
    IDayOfWeekRepository,
    IListCategoryRequest,
    IListDayOfWeekResponse,
} from "../IDayOfWeekRepository";
import { IDefaultFactory } from "@/shared/infra/factories/IDefaultFactory";
import { IDayOfWeekPrisma } from "../../factories/DayOfWeekPrismaFactory";
import { IDayOfWeek } from "../../model/IDayOfWeek";
import { context } from "@/shared/infra/database/Context";

class DayOfWeekPrismaRepository implements IDayOfWeekRepository {
    private prismaClient: PrismaClient;

    constructor(
        private readonly dayOfWeekFactory: IDefaultFactory<
            IDayOfWeekPrisma,
            IDayOfWeek
        >,
    ) {
        this.prismaClient = context.prisma;
    }

    async findByName(name: string): Promise<IDayOfWeek | undefined> {
        const dayOfWeekP = await this.prismaClient.dayOfWeek.findFirst({
            where: {
                name,
            },
        });

        if (!dayOfWeekP) return undefined;

        return this.dayOfWeekFactory.generate(dayOfWeekP);
    }

    async list({
        search,
        limit,
        offset,
    }: IListCategoryRequest): Promise<IListDayOfWeekResponse | undefined> {
        const where = search
            ? {
                  OR: [
                      {
                          name: {
                              contains: search,
                          },
                      },
                  ],
              }
            : undefined;

        const count = await this.prismaClient.dayOfWeek.count({
            where,
        });

        const dayOfWeeksP = await this.prismaClient.dayOfWeek.findMany({
            where,
            take: limit,
            skip: offset,
        });

        if (!dayOfWeeksP) return undefined;

        const dayofWeeks = await Promise.all(
            dayOfWeeksP.map(async (dayP) => {
                return await this.dayOfWeekFactory.generate(dayP);
            }),
        );

        return {
            dayofWeeks,
            count,
        };
    }
}

export { DayOfWeekPrismaRepository }

import { IDefaultFactory } from "@/shared/infra/factories/IDefaultFactory";
import { DayOfWeek as PDayOfWeek } from "@prisma/client";
import { IDayOfWeek } from "../model/IDayOfWeek";

export interface IDayOfWeekPrisma extends PDayOfWeek {}

export class DayOfWeekPrismaFactory
    implements IDefaultFactory<IDayOfWeekPrisma, IDayOfWeek>
{
    async generate(entity: IDayOfWeekPrisma): Promise<IDayOfWeek> {
        return {
            id: entity.id,
            guid: entity.guid,
            name: entity.name,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
}

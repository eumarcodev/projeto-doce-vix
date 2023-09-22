import { PrismaClient } from "@prisma/client";

export const seedDayOfWeek = async (prisma: PrismaClient) => {
    const daysOfWeekP = await prisma.dayOfWeek.findMany();
    if (daysOfWeekP.length > 0) {
        await prisma.dayOfWeek.deleteMany();
    }

    await prisma.dayOfWeek.create({
        data: {
            name: "Segunda",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    await prisma.dayOfWeek.create({
        data: {
            name: "Terça",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    await prisma.dayOfWeek.create({
        data: {
            name: "Quarta",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    await prisma.dayOfWeek.create({
        data: {
            name: "Quinta",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    await prisma.dayOfWeek.create({
        data: {
            name: "Sexta",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    await prisma.dayOfWeek.create({
        data: {
            name: "Sábado",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    await prisma.dayOfWeek.create({
        data: {
            name: "Domingo",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });
};

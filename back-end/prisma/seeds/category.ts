import { PrismaClient } from "@prisma/client";

export const seedCategory = async (prisma: PrismaClient) => {
    const categoriesP = await prisma.category.findMany();
    if (categoriesP.length > 0) {
        await prisma.category.deleteMany();
    }

    await prisma.category.create({
        data: {
            name: "Bebidas",
            description: "Bebidas em geral",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    await prisma.category.create({
        data: {
            name: "Lanches",
            description: "Lanches em geral",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    await prisma.category.create({
        data: {
            name: "Beirutes",
            description: "Beirutes em geral",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    await prisma.category.create({
        data: {
            name: "Bolos",
            description: "Bolos em geral",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    await prisma.category.create({
        data: {
            name: "Hamburgueres Artesanais",
            description: "Hamburgueres Artesanais",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    await prisma.category.create({
        data: {
            name: "Paletas",
            description: "Paletas em geral",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    await prisma.category.create({
        data: {
            name: "Porções",
            description: "Porções em geral",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    await prisma.category.create({
        data: {
            name: "Pratos",
            description: "Pratos em geral",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });
};

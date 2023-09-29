import { PrismaClient } from "@prisma/client";

import { seedCategory } from "./seeds/category";
import { seedDayOfWeek } from "./seeds/dayOfWeek";

const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
});

const main = async () => {
    await seedCategory(prisma);
    await seedDayOfWeek(prisma);
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        console.log("Prisma was disconnected");
    });

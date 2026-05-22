import { PrismaClient } from "@prisma/client";

// Mencegah pembuatan banyak instance Prisma di environment development njrrrrr
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ["query"], // Opsional: untuk melihat log query di terminal/logs okssss
    });

    if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    // Gunakan DIRECT_URL (port 5432) untuk db push
    url: process.env.DIRECT_URL as string,
  },
});
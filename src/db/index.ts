import { PrismaClient } from "@prisma/client";

// 1 . Prisma Client to access our Database
export const db = new PrismaClient();
db.snippet.create({
  data: {
    // id is generated automatically 😏
    title: "Title",
    code: "const fxn = () => console.log('Rajat')",
  },
});

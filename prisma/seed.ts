import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.forumCategory.createMany({
    data: [
      {
        name: "Product strategy",
        description: "Vision, positioning, and roadmap debates.",
      },
      {
        name: "Engineering leadership",
        description: "People, process, and org design discussions.",
      },
      {
        name: "System design",
        description: "Architecture, scalability, and reliability focus.",
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

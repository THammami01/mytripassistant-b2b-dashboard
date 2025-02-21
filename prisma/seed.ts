import prisma from "./db";

const main = async () => {
  // await Promise.all([].map((el) => prisma.xxxx.upsert({})));
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

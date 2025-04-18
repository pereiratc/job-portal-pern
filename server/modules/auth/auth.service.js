const allUsers = await prisma.use.findMany();
console.log(allUsers);
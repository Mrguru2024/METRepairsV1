import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('Destiny@2025', 10);

  const superAdmin = await prisma.user.upsert({
    where: { email: '5epmgllc@gmail.com' },
    update: {
      password: hashedPassword,
      role: Role.SUPER_ADMIN,
    },
    create: {
      email: '5epmgllc@gmail.com',
      password: hashedPassword,
      role: Role.SUPER_ADMIN,
      name: 'Super Admin',
    },
  });

  console.log('Super admin created:', superAdmin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


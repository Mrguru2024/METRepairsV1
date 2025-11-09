/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function buildTestSlot() {
  const base = new Date();
  base.setHours(9, 0, 0, 0);
  base.setDate(base.getDate() + 2);
  return base;
}

async function main() {
  const start = buildTestSlot();

  const marker = `Smoke-${start.getTime()}`;

  console.log('Creating smoke booking for', start.toISOString());

  const booking = await prisma.booking.create({
    data: {
      name: 'Smoke Test',
      email: `smoke.${marker}@example.com`,
      phone: '5551234567',
      service: 'Locksmithing',
      date: start,
      notes: 'Automated smoke test booking. Safe to remove.',
    },
  });

  console.log('Booking created:', booking.id);

  const retrieved = await prisma.booking.findUnique({
    where: { id: booking.id },
  });

  if (!retrieved) {
    throw new Error('Smoke booking not found after creation.');
  }

  console.log('Booking verified in database.');

  await prisma.booking.delete({ where: { id: booking.id } });

  console.log('Smoke booking cleaned up.');
}

try {
  await main();
  console.log('Booking smoke test completed successfully.');
} catch (err) {
  console.error('Booking smoke test failed:', err);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}

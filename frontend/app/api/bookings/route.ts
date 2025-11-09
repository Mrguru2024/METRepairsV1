import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { bookingSchema } from '@/lib/validation/booking';

export async function GET() {
  const bookings = await prisma.booking.findMany({
    orderBy: { date: 'asc' },
  });

  return NextResponse.json({
    bookings,
  });
}

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const parsed = bookingSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        errors: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const { date, phone, notes, ...rest } = parsed.data;

  const slot = new Date(date);

  const existing = await prisma.booking.findFirst({
    where: { date: slot },
  });

  if (existing) {
    return NextResponse.json(
      {
        message: 'That time slot has already been booked.',
      },
      { status: 409 },
    );
  }

  const booking = await prisma.booking.create({
    data: {
      ...rest,
      phone: phone?.trim() ? phone.trim() : null,
      notes: notes?.trim() ? notes.trim() : null,
      date: slot,
    },
  });

  return NextResponse.json(
    {
      booking,
    },
    { status: 201 },
  );
}


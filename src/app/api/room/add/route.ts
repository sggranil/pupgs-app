import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, location, capacity } = body;

    if (!name) {
      return NextResponse.json({ message: 'Room name is required' }, { status: 400 });
    }

    await prisma.room.create({
      data: {
        name,
        location,
        capacity: capacity === undefined || capacity === null || capacity === "" ? null : Number(capacity),
      },
    });

    return NextResponse.json({ message: 'Room successfully added' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to add room' }, { status: 500 });
  }
}

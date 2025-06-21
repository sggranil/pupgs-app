import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const rooms = await prisma.room.findMany();

    return NextResponse.json({ data: rooms, status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch rooms' }, { status: 500 });
  }
}

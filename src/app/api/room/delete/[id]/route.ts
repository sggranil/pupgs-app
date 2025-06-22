import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const roomId = parseInt(params.id);

  if (isNaN(roomId)) {
    return NextResponse.json({ message: 'Invalid room ID' }, { status: 400 });
  }

  try {
    await prisma.room.delete({
      where: { id: roomId },
    });

    return NextResponse.json({ message: 'Room successfully deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete room' }, { status: 500 });
  }
}

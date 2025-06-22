import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string; date: string } }
) {
    try {
        const roomId = parseInt(params.id);
        const date = params.date;

        if (!roomId || !date) {
            return NextResponse.json(
                { message: "Missing roomId or date." },
                { status: 400 }
            );
        }

        // Filter by exact date (in PST)
        const filterDate = new Date(`${date}T00:00:00+08:00`);

        const defenses = await prisma.thesis.findMany({
            where: {
                room_id: roomId,
                defense_date: filterDate, // exact match by date only
            },
            select: {
                defense_time: true,
            },
        });

        const unavailableTimes: string[] = defenses
            .filter(def => def.defense_time !== null)
            .map(def => {
                const time = new Date(def.defense_time as Date);
                return time.toLocaleTimeString("en-PH", {
                    timeZone: "Asia/Manila",
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                });
            });

        return NextResponse.json({
            data: unavailableTimes,
            status: 200,
        });
    } catch (err) {
        console.error("Error checking room availability:", err);
        return NextResponse.json(
            { message: "An error occurred while checking availability." },
            { status: 500 }
        );
    }
}

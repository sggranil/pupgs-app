import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
    request: NextRequest,
    { params }: { params: { date: Date } }
) {
    try {
        const { date } = await params;

        if (!date) {
            return NextResponse.json(
                { message: "Missing data on date field." },
                { status: 400 }
            );
        }

        const filterDate = new Date(`${date}T00:00:00+08:00`);

        const defenses = await prisma.thesis.findMany({
            where: {
                defense_schedule: {
                    not: filterDate,
                },
            },
        });

        return NextResponse.json({
            data: defenses,
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

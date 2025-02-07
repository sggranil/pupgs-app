import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { id, defense_date, defense_time, panelists } = await request.json();

        if (!id || !defense_date || !defense_time || !panelists || !Array.isArray(panelists)) {
            return NextResponse.json(
                { message: "All fields are required and panelists must be an array" },
                { status: 400 }
            );
        }

        if (isNaN(id) || panelists.some((panelistId) => isNaN(panelistId))) {
            return NextResponse.json(
                { message: "Invalid ID format" },
                { status: 400 }
            );
        }

        const defenseTime = `${new Date().toISOString().split('T')[0]}T${defense_time}:00`;

        const updatedThesis = await prisma.thesis.update({
            where: { id },
            data: {
                defense_date: new Date(defense_date),
                defense_time: new Date(defenseTime),
                panelists: {
                    set: panelists.map((panelistId) => ({ id: panelistId }))
                }
            },
            include: {
                panelists: true
            }
        });

        return NextResponse.json(
            { message: "Schedule updated successfully", data: updatedThesis },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error updating thesis:", err instanceof Error ? err.stack : err);
        return NextResponse.json(
            { message: "An error occurred while updating the thesis" },
            { status: 500 }
        );
    }
}

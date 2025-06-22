import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const {
            id,
            defense_date,
            defense_time,
            panelists,
            room_id,
            thesis_secretary_id
        } = await request.json();

        if (
            !id ||
            !defense_date ||
            !defense_time ||
            !room_id ||
            !thesis_secretary_id ||
            !panelists ||
            !Array.isArray(panelists)
        ) {
            return NextResponse.json(
                { message: "All fields are required and panelists must be an array." },
                { status: 400 }
            );
        }

        // ✅ Validate ID formats
        if (
            isNaN(id) ||
            isNaN(room_id) ||
            isNaN(thesis_secretary_id) ||
            panelists.some((panelistId) => isNaN(panelistId))
        ) {
            return NextResponse.json(
                { message: "Invalid ID format." },
                { status: 400 }
            );
        }

        // ✅ Parse to Date objects
        const parsedDefenseDate = new Date(defense_date);
        const parsedDefenseTime = new Date(defense_time);

        // ✅ Update thesis with related data
        const updatedThesis = await prisma.thesis.update({
            where: { id },
            data: {
                defense_date: parsedDefenseDate,
                defense_time: parsedDefenseTime,
                room: { connect: { id: room_id } },
                secretary: { connect: { id: thesis_secretary_id } },
                panelists: {
                    set: panelists.map((panelistId) => ({ id: panelistId }))
                }
            },
            include: {
                room: true,
                secretary: {
                    include: { user: true }
                },
                panelists: {
                    include: { user: true }
                }
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

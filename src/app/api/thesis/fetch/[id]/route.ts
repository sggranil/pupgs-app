import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const thesis = await prisma.thesis.findFirst({
            where: { student_id: parseInt(params.id) },
            include: {
                proposals: true,
                room: true,
                student: { include: { user: true } },
                secretary: { include: { user: true } },
                adviser: { include: { user: true } },
                panelists: { include: { user: true } },
            },
        });

        if (!thesis) {
            return NextResponse.json(
                { message: "Thesis not found." },
                { status: 404 }
            );
        }

        const safeThesis = {
            ...thesis,
            student: thesis.student ? {
                id: thesis.student.id,
                user: {
                    first_name: thesis.student.user.first_name,
                    last_name: thesis.student.user.last_name,
                    standing: thesis.student.user.standing,
                    program: thesis.student.user.program,
                },
            } : null,
            adviser: thesis.adviser ? {
                id: thesis.adviser.id,
                user: {
                    first_name: thesis.adviser.user.first_name,
                    last_name: thesis.adviser.user.last_name,
                    position: thesis.adviser.user.position,
                    program: thesis.adviser.user.program,
                },
            } : null,
            secretary: thesis.secretary ? {
                id: thesis.secretary.id,
                user: {
                    first_name: thesis.secretary.user.first_name,
                    last_name: thesis.secretary.user.last_name,
                    position: thesis.secretary.user.position,
                    program: thesis.secretary.user.program,
                },
            } : null,
            panelists: thesis.panelists.map((panelist) => ({
                id: panelist.id,
                user: {
                    first_name: panelist.user.first_name,
                    last_name: panelist.user.last_name,
                    position: panelist.user.position,
                    program: panelist.user.program,
                }
            })),
            room: thesis.room ? {
                id: thesis.room.id,
                name: thesis.room.name,
                location: thesis.room.location,
                capacity: thesis.room.capacity,
            } : null
        };

        return NextResponse.json({ data: safeThesis }, { status: 200 });
    } catch (err) {
        console.error("Error fetching thesis:", err);
        return NextResponse.json(
            { message: "An error occurred during fetching" },
            { status: 500 }
        );
    }
}

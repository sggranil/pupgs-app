import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const thesisId = parseInt(id)

        if (isNaN(thesisId)) {
            return NextResponse.json(
                { message: "Invalid thesis ID format." },
                { status: 400 }
            );
        }

        const thesis = await prisma.thesis.findUnique({
            where: { id: thesisId },
            include: {
                attachments: true,
                room: true,
                student: { include: { user: true } },
                secretary: { include: { user: true } },
                adviser: { include: { user: true } },
                panelists: { include: { user: true } },
                thesis_receipts: true,
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

            panelists: thesis.panelists.map((panelist: any) => ({
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
            } : null,

            thesis_receipts: thesis.thesis_receipts.map((receipt: any) => ({
                id: receipt.id,
                or_number: receipt.or_number,
                attachment: receipt.attachment,
                status: receipt.status,
                receipt_name: receipt.receipt_name,
            })),
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
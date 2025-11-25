import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { id, status, message, adviser_id, user_id } = await request.json();

        const thesisId = Number(id);
        if (!thesisId || isNaN(thesisId)) {
            return NextResponse.json(
                { message: "Invalid ID" },
                { status: 400 }
            );
        }

        const confirmedThesis = await prisma.thesis.update({
            where: { id: thesisId },
            data: {
                adviser_id,
                user_id,
                status,
                message,
            },
        });

        return NextResponse.json(
            {
                message: "Thesis updated successfully",
                id: thesisId,
                data: confirmedThesis
            },
            { status: 200 }
        );
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "An error occurred while updating the thesis" },
            { status: 500 }
        );
    }
}

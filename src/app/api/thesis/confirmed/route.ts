import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { id, is_confirmed, adviser_id } = await request.json();

        if (isNaN(id)) {
            return NextResponse.json(
                { message: "Invalid ID" },
                { status: 400 }
            );
        }

        if (!id || !is_confirmed || !adviser_id) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        const confirmedThesis = await prisma.thesis.update({
            where: { id },
            data: {
                adviser_id: adviser_id,
                is_confirmed: is_confirmed,
            },
        });

        return NextResponse.json(
            { message: "Thesis updated successfully", data: confirmedThesis },
            { status: 200 }
        );
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "An error occurred while updating the subject" },
            { status: 500 }
        );
    }
}

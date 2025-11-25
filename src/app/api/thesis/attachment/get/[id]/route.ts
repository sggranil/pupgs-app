import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;

        const thesisId = Number(id);

        if (isNaN(thesisId)) {
            return NextResponse.json(
                { message: "Invalid Thesis ID." },
                { status: 400 }
            );
        }

        const attachment = await prisma.attachment.findMany({
            where: { thesis_id: thesisId },
        });

        // Always check for array length when using findMany
        if (attachment.length === 0) {
            return NextResponse.json(
                { message: "Thesis not found or has no attachments." },
                { status: 404 }
            );
        }

        return NextResponse.json({
            data: attachment,
            status: 200
        });
    } catch (err) {
        console.error("Error fetching thesis:", err);
        return NextResponse.json(
            { message: "An error occurred during fetching" },
            { status: 500 }
        );
    }
}
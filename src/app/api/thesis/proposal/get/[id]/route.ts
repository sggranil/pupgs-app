import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const thesisId = Number(params.id);
        if (isNaN(thesisId)) {
            return NextResponse.json(
                { message: "Invalid Thesis ID." },
                { status: 400 }
            );
        }

        const proposal = await prisma.proposal.findMany({
            where: { thesis_id: thesisId },
        });

        if (!proposal) {
            return NextResponse.json(
                { message: "Thesis not found." },
                { status: 404 }
            );
        }

        return NextResponse.json({ 
            data: proposal,
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
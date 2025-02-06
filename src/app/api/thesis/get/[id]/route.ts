import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const thesis = await prisma.thesis.findMany({
            where: { student_id: parseInt(params.id) },
            include: {
                proposals: true,
            },
        });

        if (!thesis || thesis.length === 0) {
            return NextResponse.json(
                { message: "Thesis not found." },
                { status: 404 }
            );
        }

        return NextResponse.json({ 
            data: thesis,
            status: 200 
        });
    } catch (err) {
        return NextResponse.json(
            { message: "An error occurred during fetching" },
            { status: 500 }
        );
    }
}

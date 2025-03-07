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

        const thesis = await prisma.thesis.findUnique({
            where: { id: thesisId },
            include: {
                proposals: true,
                student: {
                    include: {
                        user: true
                    }
                },
                adviser: {
                    include: {
                        user: true,
                    }
                },
                panelists: {
                    include: {
                        user: true,
                    }
                },
            },
        });

        if (!thesis) {
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

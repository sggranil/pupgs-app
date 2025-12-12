import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;

        const thesis = await prisma.thesis.findMany({
            where: {
                OR: [
                    { student_id: parseInt(id) },
                    {
                        adviser: {
                            user_id: parseInt(id)
                        }
                    }
                ]
            },
            select: {
                id: true,
                thesis_title: true,
                status: true,
                created_at: true,
                updated_at: true,
            },
        });

        return NextResponse.json({
            data: thesis,
            status: 200
        });
    } catch (err) {
        return NextResponse.json(
            { message: `An unexpected server error occurred while fetching data.` },
            { status: 500 }
        );
    }
}

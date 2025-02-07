import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const subject = await prisma.enrolledSubject.findMany({
            include: {
                student: {
                    include: {
                        user: true,
                    }
                },
            }
        });

        if (!subject) {
            return NextResponse.json(
                { message: "Subject not found." },
                { status: 401 }
            );
        }

        return NextResponse.json({ 
            data: subject,
            status: 200 
        });
    } catch (err) {
        return NextResponse.json(
            { message: "An error occurred during fetching" },
            { status: 500 }
        );
    }
}

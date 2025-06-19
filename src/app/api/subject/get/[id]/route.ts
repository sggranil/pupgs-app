import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const student = await prisma.student.findUnique({
            where: { user_id: parseInt(params.id) },
        });

        if (!student) {
            return NextResponse.json(
                { message: "Student not found for this user." },
                { status: 404 }
            );
        }
        const subject = await prisma.enrolledSubject.findMany({
            where: { student_id: parseInt(params.id) },
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

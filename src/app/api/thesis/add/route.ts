import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";
import { getUserId } from '@/utilities/AuthUtilities';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { thesis_title, file_url } = await request.json();
        const userIdCookie = await getUserId();

        if (!userIdCookie) {
            return NextResponse.json(
                { message: "User ID is missing in cookies" },
                { status: 401 }
            );
        }

        const userId = parseInt(userIdCookie);

        if (isNaN(userId)) {
            return NextResponse.json(
                { message: "Invalid User ID" },
                { status: 400 }
            );
        }

        if (!thesis_title || !file_url) {
            return NextResponse.json(
                { message: "Fields are required" },
                { status: 400 }
            );
        }

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json(
                { message: "No user found." },
                { status: 401 }
            );
        }

        const student = await prisma.student.findUnique({
            where: { user_id: userId },
        });

        if (!student) {
            return NextResponse.json(
                { message: "Student record not found for this user." },
                { status: 404 }
            );
        }

        const newThesis = await prisma.thesis.create({
            data: {
                thesis_title,
                status: "pending_review",
                student: { connect: { id: student.id } },
                proposals: {
                    create: [{ file_url }],
                },
            },
            include: {
                proposals: true,
            },
        });

        return NextResponse.json(
            { message: "Thesis uploaded successfully", data: newThesis },
            { status: 201 }
        );

    } catch (err: any) {
        console.error(err.message)
        return NextResponse.json(
            { message: "An error occurred during uploading: " + err },
            { status: 500 }
        );
    }
}

import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

import { getUserId } from '@/utilities/AuthUtilities';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { subject_name, or_number, attachment } = await request.json();
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

        if (!subject_name || !or_number || !attachment) {
            return NextResponse.json(
                { message: "Fields are required" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json(
                { message: "No user found." },
                { status: 401 }
            );
        }

        const uploadSubject = await prisma.enrolledSubject.create({
            data: {
                student_id: userId,
                subject_name,
                or_number,
                attachment,
                is_confirmed: false,
            },
        });

        return NextResponse.json(
            { message: "Subject uploaded successfully", data: uploadSubject },
            { status: 201 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: "An error occurred during adding. " + err},
            { status: 500 }
        );
    }
}

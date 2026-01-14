import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { user_id, thesis_title, file_type, file_url } = await request.json();

        if (!user_id || !thesis_title || !file_type || !file_url) {
            return NextResponse.json(
                { message: "Fields are required" },
                { status: 400 }
            );
        }

        const student = await prisma.student.findUnique({
            where: { user_id: Number(user_id) },
        });

        if (!student) {
            return NextResponse.json(
                { message: "Student record not found for this user." },
                { status: 404 }
            );
        }

        const thesis = await prisma.thesis.create({
            data: {
                thesis_title,
                status: "pending_review",
                student: { connect: { id: student.id } },
                attachments: {
                    create: [{ file_type, file_url }],
                },
            },
        });

        return NextResponse.json(
            { message: "Concept paper created successfully.", data: thesis },
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

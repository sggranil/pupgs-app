import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { id, is_confirmed } = await request.json();

        if (isNaN(id)) {
            return NextResponse.json(
                { message: "Invalid ID" },
                { status: 400 }
            );
        }

        if (!id) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        const updatedSubject = await prisma.enrolledSubject.update({
            where: { id },
            data: {
                is_confirmed: is_confirmed,
            },
        });

        return NextResponse.json(
            { message: "Subject updated successfully", data: updatedSubject },
            { status: 200 }
        );
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "An error occurred while updating the subject" },
            { status: 500 }
        );
    }
}

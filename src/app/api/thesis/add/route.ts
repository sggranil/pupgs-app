import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { thesis_title, file_url } = await request.json();
        const userIdCookie = request.cookies.get("id")?.value;

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

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json(
                { message: "No user found." },
                { status: 401 }
            );
        }

        const newThesis = await prisma.thesis.create({
            data: {
                student: userId ? { connect: { id: userId } } : undefined,
                user: userId ? { connect: { id: userId } } : undefined,
                thesis_title,
                is_confirmed: false,
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
    } catch (err) {
        return NextResponse.json(
            { message: "An error occurred during login" },
            { status: 500 }
        );
    }
}

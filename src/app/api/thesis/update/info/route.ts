import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

import { getUserId } from '@/utilities/AuthUtilities';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const userIdCookie = await getUserId();

        if (!userIdCookie) {
            return NextResponse.json({ message: "User ID is missing in cookies" }, { status: 401 });
        }

        const userId = parseInt(userIdCookie);
        if (isNaN(userId)) {
            return NextResponse.json({ message: "Invalid User ID" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { id, ...data } = body;
        if (!id || typeof id !== 'number') {
            return NextResponse.json({ message: "Invalid or missing thesis ID" }, { status: 400 });
        }

        const thesis = await prisma.thesis.findUnique({ where: { id } });
        if (!thesis) {
            return NextResponse.json({ message: "Thesis not found." }, { status: 404 });
        }

        const updatedThesis = await prisma.thesis.update({
            where: { id },
            data,
        });

        return NextResponse.json(
            { message: "Thesis updated successfully", data: updatedThesis },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error updating thesis:", err);
        return NextResponse.json(
            { message: "An error occurred while updating the thesis" },
            { status: 500 }
        );
    }
}
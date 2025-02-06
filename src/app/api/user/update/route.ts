import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const userId = (await cookies()).get("id")?.value;

        const data = await request.json();

        if (!userId || isNaN(Number(userId))) {
            return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
        }

        if (Object.keys(data).length === 0) {
            return NextResponse.json({ error: "No data provided for update" }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { id: Number(userId) },
        });

        if (!existingUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: Number(userId) },
            data,
        });

        return NextResponse.json({
            message: "User updated successfully",
            data: updatedUser,
        });
    } catch (err) {
        return NextResponse.json(
            { error: "An error occurred while updating the user" },
            { status: 500 }
        );
    }
}

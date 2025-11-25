import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {

        const user = await prisma.user.findMany();

        if (!user) {
            return NextResponse.json(
                { message: "User not found." },
                { status: 401 }
            );
        }

        return NextResponse.json({
            data: user,
            status: 200
        });
    } catch (err) {
        return NextResponse.json(
            { message: "An error occurred during fetching" },
            { status: 500 }
        );
    }
}

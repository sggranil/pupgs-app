import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { payload } = await request.json();

        if (!payload) {
            return NextResponse.json(
                { message: "Fields are required." },
                { status: 400 }
            );
        }

        const thesis = await prisma.thesis.findUnique({
            where: { id: Number(payload.thesis_id) },
        });

        if (!thesis) {
            return NextResponse.json(
                { message: "Thesis record does not exist." },
                { status: 404 }
            );
        }

        await prisma.attachment.create({
            data: {
                ...payload
            },
        });

        return NextResponse.json(
            { message: "Link attachment uploaded successfully." },
            { status: 201 }
        );
    } catch (err) {

        if (err instanceof Error) {
            console.log("Error: ", err.stack)
        }
        return NextResponse.json(
            { message: "An error occurred during uploading" },
            { status: 500 }
        );
    }
}

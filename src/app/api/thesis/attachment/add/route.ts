import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { thesis_id, file_type, file_url } = await request.json();

        if (!thesis_id || !file_type || !file_url || typeof file_url !== 'string') {
            return NextResponse.json(
                { message: "Thesis ID or file URL is missing or invalid." },
                { status: 400 }
            );
        }

        const thesisExists = await prisma.thesis.findUnique({
            where: { id: Number(thesis_id) },
        });

        if (!thesisExists) {
            return NextResponse.json(
                { message: "Thesis ID does not exist." },
                { status: 404 }
            );
        }

        await prisma.attachment.create({
            data: {
                thesis_id: Number(thesis_id),
                file_type: file_type,
                file_url: file_url,
            },
        });

        return NextResponse.json(
            { message: "File uploaded successfully" },
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

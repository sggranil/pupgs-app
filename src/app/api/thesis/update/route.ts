import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { thesis_id, payload } = await request.json();

        const thesis = await prisma.thesis.findUnique({ where: { id: thesis_id } });
        if (!thesis) {
            return NextResponse.json({ message: "Thesis not found." }, { status: 404 });
        }

        await prisma.thesis.update({
            where: { id: thesis_id },
            data: {
                ...payload
            }
        });

        return NextResponse.json(
            { message: "Thesis updated successfully!" },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error updating thesis:", err);
        return NextResponse.json(
            { message: "An error occurred while updating the thesis" + err.message },
            { status: 500 }
        );
    }
}
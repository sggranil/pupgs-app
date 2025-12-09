import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { user_id, thesis_id, payload } = await request.json();
        const parseId = parseInt(user_id)

        const user = await prisma.thesis.findFirst({
            where: {
                OR: [
                    { student_id: parseId },
                    { adviser_id: parseId }
                ]
            },
        })

        if (!user) {
            return NextResponse.json({ message: "User record not found." }, { status: 404 });
        }

        const thesis = await prisma.thesis.findUnique({ where: { id: thesis_id } });

        if (!thesis) {
            return NextResponse.json({ message: "Thesis record not found." }, { status: 404 });
        }

        await prisma.thesis.update({
            where: {
                id: thesis_id, OR: [
                    { student_id: parseId },
                    { adviser_id: parseId }
                ]
            },
            data: {
                ...payload
            }
        });

        return NextResponse.json(
            { message: "Thesis updated successfully!" },
            { status: 200 }
        );
    } catch (err: any) {
        return NextResponse.json(
            { message: "An error occurred while updating the thesis" + err.message },
            { status: 500 }
        );
    }
}
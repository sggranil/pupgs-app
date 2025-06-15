import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

import { getUserId } from '@/utilities/AuthUtilities';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { id, thesis_title, file_url } = await request.json();
        const userIdCookie = await getUserId();

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

        if (!id || !thesis_title || !file_url) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return NextResponse.json(
                { message: "No user found." },
                { status: 401 }
            );
        }

        const thesis = await prisma.thesis.findUnique({ where: { id } });
        if (!thesis) {
            return NextResponse.json(
                { message: "Thesis not found." },
                { status: 404 }
            );
        }

        const updatedThesis = await prisma.thesis.update({
            where: { id },
            data: { thesis_title, is_confirmed: false },
        });

        const existingProposal = await prisma.proposal.findFirst({
            where: { thesis_id: id },
        });

        if (existingProposal) {
            await prisma.proposal.update({
                where: { id: existingProposal.id },
                data: { file_url, uploaded_at: new Date() },
            });
        } else {
            await prisma.proposal.create({
                data: { thesis_id: id, file_url },
            });
        }

        return NextResponse.json(
            { message: "Thesis and proposal updated successfully", data: updatedThesis },
            { status: 200 }
        );
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "An error occurred while updating the thesis" },
            { status: 500 }
        );
    }
}

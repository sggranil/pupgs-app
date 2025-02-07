import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';

const prisma = new PrismaClient();

export async function POST(request: NextRequest, 
    { params }: { params: { id: string } }
) {
    try {
        const subject = await prisma.enrolledSubject.findUnique({
            where: { id: parseInt(params.id) },
            select: { attachment: true },
        });

        if (!subject) {
            return NextResponse.json(
                { message: "Subject not found." },
                { status: 404 }
            );
        }

        if (subject.attachment) {
            const filePath = subject.attachment;

            if (filePath.startsWith('/uploads/')) {
                const fullFilePath = `./public${filePath}`;

                if (fs.existsSync(fullFilePath)) {
                    fs.unlinkSync(fullFilePath);
                }
            }
        }

        await prisma.enrolledSubject.delete({
            where: { id: parseInt(params.id) },
        });

        return NextResponse.json({
            status: 200,
            message: 'Subject and attachment deleted successfully.',
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "An error occurred during deletion." },
            { status: 500 }
        );
    }
}

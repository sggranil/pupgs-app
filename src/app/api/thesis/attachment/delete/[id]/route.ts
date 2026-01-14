import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';

const prisma = new PrismaClient();

export async function POST(request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params;
        const parseId = parseInt(id)

        const attachment = await prisma.attachment.findUnique({
            where: { id: parseId },
            select: { file_url: true },
        });

        if (!attachment) {
            return NextResponse.json(
                { message: "Attachment not found." },
                { status: 404 }
            );
        }

        if (attachment.file_url) {
            const filePath = attachment.file_url;

            if (filePath.startsWith('/uploads/')) {
                const fullFilePath = `./public${filePath}`;

                if (fs.existsSync(fullFilePath)) {
                    fs.unlinkSync(fullFilePath);
                }
            }
        }

        await prisma.attachment.delete({
            where: { id: parseId },
        });

        return NextResponse.json({
            status: 200,
            message: 'Attachment deleted successfully.',
        });
    } catch (err) {
        return NextResponse.json(
            { message: "An error occurred during deletion." },
            { status: 500 }
        );
    }
}

import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';

const prisma = new PrismaClient();

export async function POST(request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params;

        const attachment = await prisma.attachment.findUnique({
            where: { id: parseInt(id) },
            select: { file_url: true },
        });

        if (!attachment) {
            return NextResponse.json(
                { message: "Subject not found." },
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

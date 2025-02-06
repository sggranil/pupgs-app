import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';

const prisma = new PrismaClient();

export async function POST(request: NextRequest, 
    { params }: { params: { id: string } }
) {
    try {
        const proposal = await prisma.proposal.findUnique({
            where: { id: parseInt(params.id) },
            select: { file_url: true },
        });

        if (!proposal) {
            return NextResponse.json(
                { message: "Subject not found." },
                { status: 404 }
            );
        }

        if (proposal.file_url) {
            const filePath = proposal.file_url;

            if (filePath.startsWith('/uploads/')) {
                const fullFilePath = `./public${filePath}`;

                if (fs.existsSync(fullFilePath)) {
                    fs.unlinkSync(fullFilePath);
                }
            }
        }

        await prisma.proposal.delete({
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

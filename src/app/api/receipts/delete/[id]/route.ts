import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';

export async function POST(request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params

        const receipt = await prisma.thesisReceipt.findUnique({
            where: { id: parseInt(id) },
            select: { attachment: true },
        });

        if (!receipt) {
            return NextResponse.json(
                { message: "Thesis receipt not found." },
                { status: 404 }
            );
        }

        if (receipt.attachment) {
            const filePath = receipt.attachment;

            if (filePath.startsWith('/uploads/')) {
                const fullFilePath = `./public${filePath}`;

                if (fs.existsSync(fullFilePath)) {
                    fs.unlinkSync(fullFilePath);
                }
            }
        }

        await prisma.thesisReceipt.delete({
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

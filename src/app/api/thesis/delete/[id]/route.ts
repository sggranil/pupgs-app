import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const thesisId = parseInt(params.id);

        if (isNaN(thesisId)) {
            return NextResponse.json(
                { message: "Invalid Thesis ID" },
                { status: 400 }
            );
        }

        const thesis = await prisma.thesis.findUnique({
            where: { id: thesisId },
            include: { proposals: true },
        });

        if (!thesis) {
            return NextResponse.json(
                { message: "Thesis not found." },
                { status: 404 }
            );
        }

        for (const proposal of thesis.proposals) {
            const filePath = proposal.file_url;

            if (filePath.startsWith('/uploads/')) {
                const fullFilePath = path.join(process.cwd(), 'public', filePath);

                if (fs.existsSync(fullFilePath)) {
                    fs.unlinkSync(fullFilePath);
                }
            }

            await prisma.proposal.delete({ where: { id: proposal.id } });
        }

        await prisma.thesis.delete({ where: { id: thesisId } });

        return NextResponse.json(
            { message: "Thesis and associated proposals deleted successfully." },
            { status: 200 }
        );
    } catch (err) {
        if (err instanceof Error){
            console.log("Error: ", err.stack)
        }
        return NextResponse.json(
            { message: "An error occurred during deletion." },
            { status: 500 }
        );
    }
}

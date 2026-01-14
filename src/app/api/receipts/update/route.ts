import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from "next/server";
import { ReceiptName } from '@prisma/client';

export async function POST(request: NextRequest) {
    try {
        const { receipt_id, user_id, payload } = await request.json();

        if (!receipt_id || !user_id || !payload) {
            return NextResponse.json(
                { message: "All missing fields are required." },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: user_id },
        });

        if (!user) {
            return NextResponse.json(
                { message: "No user record was found." },
                { status: 401 }
            );
        }

        const receiptNameEnum = ReceiptName[payload.receipt_name as keyof typeof ReceiptName];

        const updateThesisReceipt = await prisma.thesisReceipt.update({
            where: { id: receipt_id },
            data: {
                receipt_name: receiptNameEnum,
                ...payload
            },
        });

        return NextResponse.json(
            { message: "Thesis receipt updated successfully", data: updateThesisReceipt },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: "An error occurred while updating the receipt." },
            { status: 500 }
        );
    }
}

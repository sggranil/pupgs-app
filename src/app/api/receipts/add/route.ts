import { PrismaClient, ReceiptName } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

import { getUserId } from '@/utilities/AuthUtilities';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { user_id, payload } = await request.json();

        if (!user_id || !payload) {
            return NextResponse.json(
                { message: "All fields are required." },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: user_id },
            include: { student: true },
        });

        if (!user) {
            return NextResponse.json(
                { message: "No user record was found." },
                { status: 401 }
            );
        }

        if (!user?.student) {
            return NextResponse.json(
                { message: "No student record was found." },
                { status: 401 }
            );
        }

        const studentId = user.student.id;

        const receiptNameEnum = ReceiptName[payload.receipt_name as keyof typeof ReceiptName];

        const uploadReceipt = await prisma.thesisReceipt.create({
            data: {
                student_id: studentId,
                receipt_name: receiptNameEnum,
                ...payload
            },
        });

        return NextResponse.json(
            { message: "Receipt uploaded successfully", data: uploadReceipt },
            { status: 201 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: "An error occurred during adding. " + err },
            { status: 500 }
        );
    }
}

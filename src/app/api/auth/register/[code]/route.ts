import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(
    request: NextRequest,
    { params }: { params: { code: string } }
) {
    const { code } = await params;

    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
        return NextResponse.json(
            { message: "Server configuration error: Required environment variables (ADMIN_EMAIL, ADMIN_PASSWORD) are not set." },
            { status: 500 }
        );
    }

    if (code !== process.env.ADMIN_CODE) {
        return NextResponse.json(
            { message: "Register code is not correct" },
            { status: 403 }
        );
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email: process.env.ADMIN_EMAIL },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "Admin user already exists with this email." },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

        const newUser = await prisma.user.create({
            data: {
                email: process.env.ADMIN_EMAIL,
                password: hashedPassword,
                first_name: "PUP",
                last_name: "Admin",
                role: "admin",
            },
        });

        await prisma.adviser.create({
            data: {
                user_id: newUser.id,
            },
        });

        const res = NextResponse.json({
            message: "Admin activated successfully",
        }, { status: 201 });

        return res;
    } catch (err) {
        console.error("Admin registration error:", err);
        return NextResponse.json(
            { message: "An error occurred during admin registration" },
            { status: 500 }
        );
    }
}
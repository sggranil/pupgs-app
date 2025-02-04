import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { generateToken } from '@/utilities/TokenUtilities';
import { setCookie } from '@/utilities/AuthUtilities';

const prisma = new PrismaClient();

export async function GET(request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {

        const user = await prisma.user.findFirst({
            where: { id: parseInt(params.id) },
        });

        if (!user) {
            return NextResponse.json(
                { message: "User not found." },
                { status: 401 }
            );
        }

        return NextResponse.json({ 
            data: user,
            status: 200 
        });
    } catch (err) {
        return NextResponse.json(
            { message: "An error occurred during fetching" },
            { status: 500 }
        );
    }
}

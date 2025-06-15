import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { generateToken } from '@/utilities/TokenUtilities';
import { setCookie } from '@/utilities/AuthUtilites/AuthServer';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { message: "No user found." },
                { status: 401 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid credentials." },
                { status: 401 }
            );
        }

        const accessToken = generateToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        }, 1800); // 30 mins

        const refreshToken = generateToken({
            userId: user.id,
        }, 86400); // 1 day

        const res = NextResponse.json({
            access_token: accessToken,
            refresh_token: refreshToken,
        });

        setCookie(res, 'access_token', accessToken, { sameSite: 'strict', maxAge: 1800, path: '/' });
        setCookie(res, 'refresh_token', refreshToken, { sameSite: 'strict', maxAge: 86400, path: '/' });

        return res
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "An error occurred during login" },
            { status: 500 }
        );
    }
}

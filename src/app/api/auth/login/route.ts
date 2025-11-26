import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { generateToken } from '@/utilities/TokenUtilities';
import { setCookie } from '@/utilities/AuthUtilities';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: "Missing required fields: email and password." },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { message: "Invalid credentials." },
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
            message: "Login successful.",
            access_token: accessToken,
            refresh_token: refreshToken,
        });

        setCookie(res, 'access_token', accessToken, { maxAge: 1800 });
        setCookie(res, 'refresh_token', refreshToken, { maxAge: 86400 });

        return res;
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "An unexpected error occurred. Please try again later." },
            { status: 500 }
        );
    }
}

import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { generateToken } from '@/utilities/TokenUtilities';
import { setCookie } from '@/utilities/AuthUtilities';

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
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }

        const token = generateToken(
            {
                userId: user.id,
                email: user.email,
                role: user.role,
            },
        );

        const res = NextResponse.json({
            message: "Login successful",
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                position: user.position,
                standing: user.standing,
                first_name: user.first_name,
                last_name: user.last_name,
            },
            token,
        });

        setCookie(res, 'session', token, { maxAge: 60 * 60 * 24 * 7, path: '/' });

        const userInfo = {
            userId: user.id,
            firstName: user.first_name,
            role: user.role,
            lastName: user.last_name,
            position: user.position,
            standing: user.standing
        };

        setCookie(res, 'user', JSON.stringify(userInfo), { maxAge: 60 * 60 * 24 * 7, path: '/' });

        return res;
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "An error occurred during login" },
            { status: 500 }
        );
    }
}

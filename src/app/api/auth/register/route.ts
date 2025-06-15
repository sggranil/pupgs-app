import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

import bcrypt from 'bcryptjs';

import { generateToken } from '@/utilities/TokenUtilities';
import { registerSchema } from '@/types/api/auth.types';
import { setCookie } from '@/utilities/AuthUtilities';

const prisma = new PrismaClient();


export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        const validation = registerSchema.safeParse(data);
        if (!validation.success) {
            return NextResponse.json(
                { message: validation.error.errors[0].message },
                { status: 400 }
            );
        }

        const { first_name, middle_name, last_name, email, password, role } = validation.data;

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "User with this email already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                first_name,
                middle_name: !middle_name ? "" : middle_name,
                last_name,
                role,
                tel_number: "",
                standing: role === "student" ? "Student" : null,
                position: role === "adviser" ? "Official" : null,
            },
        });

        if (role === "student") {
            await prisma.student.create({
                data: {
                    user_id: newUser.id,
                },
            });
        } else if (role === "adviser") {
            await prisma.adviser.create({
                data: {
                    user_id: newUser.id,
                },
            });
        }

        const accessToken = generateToken({
            userId: newUser.id,
            email: newUser.email,
            role: newUser.role,
        }, 1800); // 30 mins

        const refreshToken = generateToken({
            userId: newUser.id,
        }, 86400); // 1 day

        const res = NextResponse.json({
            access_token: accessToken,
            refresh_token: refreshToken,
        });

        setCookie(res, 'access_token', accessToken, { maxAge: 1800 });
        setCookie(res, 'refresh_token', refreshToken, { maxAge: 86400 });

        return res
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "An error occurred during registration" },
            { status: 500 }
        );
    }
}

import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from '@/utilities/TokenUtilities';

import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const token = request.headers.get('Authorization')?.split(' ')[1];

        if (!token) {
            return NextResponse.json(
                { error: "Authorization token is required" },
                { status: 401 }
            );
        }

        let decoded;
        try {
            decoded = verifyToken(token);
        } catch (err) {
            return NextResponse.json(
                { error: "Invalid or expired token" },
                { status: 401 }
            );
        }

        const { userId } = decoded;

        const body = await request.json();
        const {
            email,
            password,
            first_name,
            middle_name,
            last_name,
            ext_name,
            role,
            tel_number,
            standing,
            position,
        } = body;

        if (
            !email &&
            !password &&
            !first_name &&
            !middle_name &&
            !last_name &&
            !ext_name &&
            !role &&
            !tel_number &&
            !standing &&
            !position
        ) {
            return NextResponse.json(
                { error: "At least one field must be provided to update" },
                { status: 400 }
            );
        }

        const updateData: { [key: string]: any } = {};
        if (email) updateData.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }
        if (first_name) updateData.first_name = first_name;
        if (middle_name) updateData.middle_name = middle_name;
        if (last_name) updateData.last_name = last_name;
        if (ext_name) updateData.ext_name = ext_name;
        if (role) updateData.role = role;
        if (tel_number) updateData.tel_number = tel_number;
        if (standing) updateData.standing = standing;
        if (position) updateData.position = position;

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData,
        });

        return NextResponse.json({
            message: "User updated successfully",
            user: {
                id: updatedUser.id,
                email: updatedUser.email,
                first_name: updatedUser.first_name,
                middle_name: updatedUser.middle_name,
                last_name: updatedUser.last_name,
                ext_name: updatedUser.ext_name,
                role: updatedUser.role,
                tel_number: updatedUser.tel_number,
                standing: updatedUser.standing,
                position: updatedUser.position,
            },
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "An error occurred while updating the user" },
            { status: 500 }
        );
    }
}

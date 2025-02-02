import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from '@/utilities/TokenUtilities';

import bcrypt from 'bcryptjs';
import { getCookie } from '@/utilities/AuthUtilities';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const userId = getCookie(null, "id");

        const body = await request.json();
        const {
            first_name,
            middle_name,
            last_name,
            ext_name,
            tel_number,
            standing,
            position,
        } = body;

        const updateData: { [key: string]: any } = {};
        if (first_name) updateData.first_name = first_name;
        if (middle_name) updateData.middle_name = middle_name;
        if (last_name) updateData.last_name = last_name;
        if (ext_name) updateData.ext_name = ext_name;
        if (tel_number) updateData.tel_number = tel_number;
        if (standing) updateData.standing = standing;
        if (position) updateData.position = position;

        const updatedUser = await prisma.user.update({
            where: { id: Number(userId) },
            data: updateData,
        });

        return NextResponse.json({
            message: "User updated successfully",
            data: updatedUser
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "An error occurred while updating the user" },
            { status: 500 }
        );
    }
}

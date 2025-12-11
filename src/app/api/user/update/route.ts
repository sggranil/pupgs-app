import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";
import { getUserId } from '@/utilities/AuthUtilities';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { user_id, payload } = await request.json();

        if (!user_id || !payload) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { id: user_id },
        });

        if (!existingUser) {
            return NextResponse.json({ error: "User record was not found." }, { status: 404 });
        }

        const {
            old_password,
            password,
            confirm_password,
            ...otherUpdates
        } = payload;

        Object.keys(otherUpdates).forEach((key) => {
            if (otherUpdates[key] === "" || otherUpdates[key] === undefined) {
                otherUpdates[key] = null;
            }
        });

        if (password || confirm_password) {
            if (!old_password) {
                return NextResponse.json({ error: "Old password is required" }, { status: 400 });
            }

            const isMatch = await bcrypt.compare(old_password, existingUser.password);
            if (!isMatch) {
                return NextResponse.json({ error: "Old password is incorrect" }, { status: 400 });
            }

            if (password !== confirm_password) {
                return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            otherUpdates.password = hashedPassword;
        }

        const updatedUser = await prisma.user.update({
            where: { id: user_id },
            data: otherUpdates,
        });

        return NextResponse.json({
            message: "User record updated successfully.",
            data: updatedUser,
        });
    } catch (err: any) {
        return NextResponse.json(
            { error: `An error occurred while updating the user: ${err.message}` },
            { status: 500 }
        );
    }
}

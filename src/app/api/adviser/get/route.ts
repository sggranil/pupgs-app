import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const adviser = await prisma.adviser.findMany({
            include: {
                user: {
                    select: {
                        id: false,
                        email: true,
                        first_name: true,
                        middle_name: true,
                        last_name: true,
                        ext_name: true,
                        prefix: true,
                        role: true,
                        tel_number: false,
                        start_date: false,
                        pass_date: false,
                        standing: true,
                        program: true,
                        department: true,
                        position: true,
                        is_archived: false,
                        created_at: false,
                        updated_at: false,
                    }
                }

            },
        });

        if (!adviser) {
            return NextResponse.json(
                { message: "Advisers not found." },
                { status: 401 }
            );
        }

        return NextResponse.json({
            data: adviser,
            status: 200
        });
    } catch (err: any) {
        console.log(err.message)
        return NextResponse.json(
            { message: "An error occurred during fetching" + err.message },
            { status: 500 }
        );
    }
}

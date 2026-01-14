import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const receipt = await prisma.thesisReceipt.findMany({
            include: {
                student: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                first_name: true,
                                middle_name: true,
                                last_name: true,
                                ext_name: true,
                                role: true,
                            }
                        }
                    }
                }
            }
        });

        return NextResponse.json({
            data: receipt,
            status: 200
        });

    } catch (err) {
        console.error("Error fetching enrolled subjects:", err);
        return NextResponse.json(
            { message: "An error occurred during fetching" },
            { status: 500 }
        );
    }
}

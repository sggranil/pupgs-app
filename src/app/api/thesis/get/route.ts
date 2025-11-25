import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const thesis = await prisma.thesis.findMany({
            include: {
                attachments: true,
                room: true,
                user: true,
                student: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                first_name: true,
                                last_name: true,
                                standing: true,
                                program: true,
                            }
                        }
                    }
                },
                adviser: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                first_name: true,
                                last_name: true,
                                position: true,
                                program: true,
                            }
                        }
                    }
                },
                secretary: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                first_name: true,
                                last_name: true,
                                position: true,
                                program: true,
                            }
                        }
                    }
                },
                panelists: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                first_name: true,
                                last_name: true,
                                position: true,
                                program: true,
                            }
                        }
                    }
                },
            },
        });

        if (!thesis || thesis.length === 0) {
            return NextResponse.json(
                { message: "Thesis not found." },
                { status: 404 }
            );
        }

        return NextResponse.json({
            data: thesis,
            status: 200
        });
    } catch (err) {
        console.error("Error fetching thesis:", err);
        return NextResponse.json(
            { message: "An error occurred during fetching" },
            { status: 500 }
        );
    }
}

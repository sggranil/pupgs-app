import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 });
    }

    const blob = await put(file.name, file, {
      access: 'public',
    });

    return NextResponse.json({
      message: "File uploaded successfully",
      fileUrl: blob.url,
    });

  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { message: "Upload failed", error: (error as Error).message },
      { status: 500 }
    );
  }
}
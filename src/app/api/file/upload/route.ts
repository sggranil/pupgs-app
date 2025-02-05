import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const config = {
  api: { bodyParser: false },
};

export async function POST(req: NextRequest) {
  try {
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.startsWith("multipart/form-data")) {
      return NextResponse.json({ message: "Invalid content type" }, { status: 400 });
    }

    const boundary = contentType.split("boundary=")[1];
    const reader = req.body?.getReader();
    if (!reader) {
      return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
    }

    let done = false;
    let buffer = Buffer.alloc(0);
    while (!done) {
      const { value, done: readerDone } = await reader.read();
      if (value) {
        buffer = Buffer.concat([buffer, value]);
      }
      done = readerDone;
    }

    const bufferString = buffer.toString();
    const filenameMatch = bufferString.match(/filename="(.+?)"/);
    let originalFilename = filenameMatch ? filenameMatch[1] : `file_${Date.now()}`;
    const fileExt = path.extname(originalFilename) || "";

    const url = new URL(req.url);
    const requestedFilename = url.searchParams.get("filename");

    const sanitizedFilename = requestedFilename
      ? path.basename(requestedFilename)
      : `${Date.now()}${fileExt}`;

    const filePath = path.join(uploadDir, sanitizedFilename);

    const fileStart = bufferString.indexOf("\r\n\r\n") + 4;
    const fileData = buffer.slice(fileStart, buffer.length - `--${boundary}--`.length);

    fs.writeFileSync(filePath, fileData);

    return NextResponse.json({
      message: requestedFilename ? "File updated successfully" : "File uploaded successfully",
      fileUrl: `/uploads/${sanitizedFilename}`,
    });
  } catch (error: unknown) {
    console.error("File Upload Error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error instanceof Error ? error.message : "Unexpected error" },
      { status: 500 }
    );
  }
}

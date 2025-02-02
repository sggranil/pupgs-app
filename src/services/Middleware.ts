import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(req: Request) {
    const cookieStore = await cookies(); 
    const sessionToken = cookieStore.get('session');

    if (!sessionToken) {
        return NextResponse.redirect(new URL('/login?type=student', req.url));
    }

    return NextResponse.next();
}

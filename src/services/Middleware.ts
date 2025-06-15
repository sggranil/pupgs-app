import { getCookie } from '@/utilities/AuthUtilities';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    if (!getCookie('access_token')) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

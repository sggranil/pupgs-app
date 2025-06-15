import { NextResponse } from 'next/server';
import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export const setCookie = (res: NextResponse, name: string, value: string, options: Partial<ResponseCookie> = {}
): void => {
  const cookieOptions: Partial<ResponseCookie> = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    sameSite: 'lax',
    ...options,
  };

  res.cookies.set(name, value, cookieOptions);
};

const safeGetCookies = () => {
  if (typeof window !== 'undefined') {
    throw new Error('getCookie() cannot be used on the client side.');
  }

  try {
    const { cookies } = require('next/headers');
    return cookies();
  } catch (e) {
    throw new Error('getCookie() called outside of App Router Server Component.');
  }
};

export const getCookie = async (name: string): Promise<string | undefined> => {
  try {
    const cookieStore = safeGetCookies();
    return cookieStore.get(name)?.value;
  } catch (error) {
    console.warn('getCookie() called outside of App Router context');
    return undefined;
  }
};

export const removeCookieServer = (res: NextResponse, name: string): void => {
  res.cookies.set(name, '', { maxAge: -1, path: '/' });
};

export const getUserRoleFromCookies = async (): Promise<string | null> => {
  const userCookie = await getCookie("user");
  if (userCookie) {
    try {
      const user = JSON.parse(userCookie);
      return user?.role || null;
    } catch (e) {
      console.error("Failed to parse user cookie", e);
    }
  }
  return null;
};

export const isServerAuthorized = async (): Promise<boolean> => {
  const sessionToken = await getCookie("session");
  return !!sessionToken;
};
import cookie from 'cookie';
import { NextResponse } from 'next/server';
import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { decodeToken } from './TokenUtilities';

type UserInfoType = 'userId' | 'role' | 'email';

// Server-side Cookie Utilities
export const setCookie = (res: NextResponse, name: string, value: string, options: Partial<ResponseCookie> = {}
): void => {
  const cookieOptions: Partial<ResponseCookie> = {
    httpOnly: false,
    secure: true,
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    sameSite: 'strict',
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

export const getUserId = async (): Promise<string | null> => {
  try {
    const userCookie = await getCookie('access_token');

    if (!userCookie) return null;

    const decoded = decodeToken(userCookie);
    return decoded?.userId || null;
  } catch (e) {
    console.error('Error decoding token in getUserId:', e);
    return null;
  }
};


// Client-side Cookie Utilities
export const getUserInfoFromCookies = (type: UserInfoType): string | null => {
  const userCookie = getClientCookie('access_token');

  if (!userCookie) return null;

  try {
    const user = decodeToken(userCookie);
    switch (type) {
      case 'userId':
        return user?.userId || null;
      case 'role':
        return user?.role || null;
      case 'email':
        return user?.email || null;
      default:
        console.warn(`Unknown user info type requested: ${type}`);
        return null;
    }
  } catch (e) {
    console.error('Failed to decode access_token:', e);
    return null;
  }
};

export const getClientCookie = (name: string): string | undefined => {
  if (typeof document === 'undefined') return undefined;
  const parsed = cookie.parse(document.cookie || '');
  return parsed[name];
};

export const isClientAuthorized = (): boolean => {
  return !!getClientCookie("access_token");
};

export const removeCookie = (name: string) => {
  if (typeof document !== 'undefined') {
    document.cookie = `${name}=; Max-Age=-1; path=/`;
  }
};

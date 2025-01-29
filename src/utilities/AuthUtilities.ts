import cookie from 'cookie';
import { NextResponse } from 'next/server';

export const isAuthorized = (req: { headers: { cookie: string | undefined }; }) => {
  const sessionToken = getCookie(req, 'session');
  return !!sessionToken;
};

export const setCookie = (res: NextResponse, name: string, value: string, options: Record<string, any> = {}) => {
  const cookieOptions = {
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as 'strict' | 'lax' | 'none',
    ...options,
  };

  res.cookies.set(name, value, cookieOptions);
};


export const getCookie = (req: { headers: { cookie: string | undefined }; } | null, name: string) => {
  if (req) {
    const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
    return cookies[name];
  } else {
    const cookies = cookie.parse(document.cookie || '');
    return cookies[name];
  }
};

export const removeCookieServer = (res: NextResponse, name: string) => {
  res.cookies.set(name, '', { maxAge: -1, path: '/' });
};

export const removeCookieClient = (name: string) => {
  if (typeof document !== 'undefined') {
    document.cookie = `${name}=; Max-Age=-1; path=/`;
  }
};
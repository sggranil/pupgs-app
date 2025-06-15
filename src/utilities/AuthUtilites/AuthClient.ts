import cookie from 'cookie';

export const getClientCookie = (name: string): string | undefined => {
  if (typeof document === 'undefined') return undefined;
  const parsed = cookie.parse(document.cookie || '');
  return parsed[name];
};

export const isClientAuthorized = (): boolean => {
  return !!getClientCookie("session");
};

export const removeCookieClient = (name: string): void => {
  if (typeof document !== 'undefined') {
    document.cookie = `${name}=; Max-Age=-1; path=/`;
  }
};
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

const onlyAdmin = ['admin'];
const onlyDocter = ['docter'];
const onlyPharmacy = ['pharmacy'];
const authPage = ['auth'];

export default function WithAuth(middleware, requireAuth) {
  return async (req, next) => {
    const pathname = req.nextUrl.pathname.split('/')[1];
    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });
      if (!token && !authPage.includes(pathname)) {
        const url = new URL('/auth/login', req.url, secret);
        url.searchParams.set('callbackUrl', encodeURI(req.url));
        return NextResponse.redirect(url);
      }
      if (token) {
        if (authPage.includes(pathname)) {
          return NextResponse.redirect(new URL('/', req.url));
        }
        if (token.role !== 'admin' && onlyAdmin.includes(pathname)) {
          return NextResponse.redirect(new URL('/', req.url));
        }
        if (token.role !== 'docter' && token.role !== 'pharmacy' && token.role !== 'admin' && onlyDocter.includes(pathname) && onlyPharmacy.includes(pathname)) {
          return NextResponse.redirect(new URL('/', req.url));
        }
      }
    }
    return middleware(req, next);
  };
}

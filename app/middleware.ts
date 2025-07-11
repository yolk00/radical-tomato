import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname !== pathname.toLowerCase()) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// source: https://medium.com/@mohymenul/solving-case-sensitivity-issues-in-next-js-routes-with-middleware-570d079b3306

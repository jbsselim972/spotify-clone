import { getToken } from "next-auth/jwt";

import { type NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname, origin } = req.nextUrl;
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  if (!token && pathname !== "/login") {
    return NextResponse.redirect(`${origin}/login`);
  }
}

export const config = {
  matcher: ["/"],
};

import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET })

  const { pathname } = req.nextUrl
  //allow the requests if the following is true
  //1) the toiken exists
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  //Redirect them to login if they dont have token and are requesting protected route
  if (!token && pathname !== '/login') {
    return NextResponse.rewrite(new URL('/login', req.url))
  }
}

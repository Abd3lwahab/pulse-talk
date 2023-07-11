import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextRequest, NextResponse } from 'next/server'

export default withAuth(
  async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname

    const isAuth = await getToken({ req: req, secret: process.env.NEXTAUTH_SECRET })
    const authRoutes = ['/friend-requests', '/login', '/chats', '/chats/:path*']

    if (pathname.startsWith('/login')) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/', req.url))
      } else {
        return NextResponse.next()
      }
    }

    if (!isAuth && authRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    if (!isAuth && pathname === '/') {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized() {
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
  ],
}

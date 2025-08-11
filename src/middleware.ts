import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  
  const authRoutes = ['/login', '/register']
  const isAuthRoute = authRoutes.includes(pathname)
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/|api/).*)',
  ],
}
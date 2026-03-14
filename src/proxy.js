// src/proxy.js
import { NextResponse } from 'next/server'

export function proxy(req) {
  const isLive = process.env.NEXT_PUBLIC_LIVE === 'true'
  const pathname = req.nextUrl.pathname

  // allow coming-soon page and Next.js internals
  if (
    isLive ||
    pathname.startsWith("/under-maintenance") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  console.log('LIVE:', process.env.NEXT_PUBLIC_LIVE)

  // redirect all other routes to coming-soon
  return NextResponse.redirect(new URL('/under-maintenance', req.url))
}

// apply to all public routes
export const config = {
  matcher: '/((?!_next).*)', // exclude Next internals
}
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.nextUrl.hostname.toLowerCase()
  const forwardedProto = request.headers
    .get('x-forwarded-proto')
    ?.split(',')[0]
    .trim()
    .toLowerCase()
  const cloudflareVisitor = request.headers.get('cf-visitor')
  const isHttp =
    request.nextUrl.protocol === 'http:' ||
    forwardedProto === 'http' ||
    cloudflareVisitor?.includes('"scheme":"http"') === true

  if (isHttp || hostname === 'www.codebeacons.in') {
    const canonicalUrl = request.nextUrl.clone()
    canonicalUrl.protocol = 'https:'
    canonicalUrl.hostname = 'codebeacons.in'
    canonicalUrl.port = ''
    return NextResponse.redirect(canonicalUrl, 308)
  }

  const headers = new Headers(request.headers)
  headers.set('x-pathname', request.nextUrl.pathname)
  return NextResponse.next({ request: { headers } })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/|certificates/).*)'],
}

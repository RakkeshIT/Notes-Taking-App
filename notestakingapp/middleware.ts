import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'

export function middileware(req: NextRequest) {
    const {pathname} = req.nextUrl
    const token = req.cookies.get('authToken')?.value;

    const isPublic = ['/', '/client/login', '/client/register'].includes(pathname)

    if(isPublic){
        return NextResponse.next()
    }

    if(!token) {
        return NextResponse.redirect(new URL('/client/login', req.url))
    }

    try {
        const secret = process.env.JWT_SECRET!
        jwt.verify(token, secret)
        return NextResponse.next()
    } catch (error) {
        return NextResponse.redirect(new URL('/client/login', req.url))
    }
}

export const config = {
    matcher: ['/dashboard/:path*'],
}
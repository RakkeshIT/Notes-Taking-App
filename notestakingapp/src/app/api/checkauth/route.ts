import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('authToken')?.value;
        if(!token) {
             return NextResponse.json({message:"Unauthorized"}, {status:401})
        }

        const JWT_SECRET = process.env.JWT_SECRET as string;
        const decoded = jwt.verify(token, JWT_SECRET)

        return NextResponse.json({message: "Authorized", user:decoded},{status:200})
    } catch (error) {
        return NextResponse.json({message: "Unauthorized"},{status:401})

    }
}
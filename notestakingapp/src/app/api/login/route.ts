import clientPromise from '@/utils/connect';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest){
    try {
        const body = await req.json();
        const {email, password} = body;
        console.log("Request Body", body);
        
        const client = await clientPromise;
        const db =  client.db();
        const user = await db.collection('User').findOne({email});
        console.log("User Have",user);
        
        if(!user){
            return NextResponse.json({message:'Email and Password Wrong'}, {status:401})
        }

        const passMatch = await bcrypt.compare(password, user.password)
        if(!passMatch){
            return NextResponse.json({message:'Email and Password Wrong'}, {status:401})
        }
        const JWT_SECRET = process.env.JWT_SECRET as string;
        const token = jwt.sign(
            {id: user._id, email:user.email, name:user.name, role: user.role},
            JWT_SECRET,
            {expiresIn: '1h'}
        )
        const response = NextResponse.json({
            message:'Login Successfull',
            name:user.name,
            email:user.email
        })

        response.cookies.set({
            name:'authToken',
            value:token,
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite:'lax',
            path:'/',
            maxAge:60 * 60  
        })
        return response;
    } catch (error: any) {
        return NextResponse.json({message:'Login Fail', error: error.message}, {status:500})
    }
}
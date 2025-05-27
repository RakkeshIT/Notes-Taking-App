import { NextResponse } from 'next/server';

export async function POST() {
        const response = NextResponse.json({message: 'Logout Successfull'})
        response.cookies.set('authToken','',{
            httpOnly:true,
            secure:true,
            path:'/',
            maxAge:0,
        })
        return response;

}
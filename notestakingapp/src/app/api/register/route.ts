import clientPromise from '@/utils/connect';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, password  }  = body;
        if (!name || !email || !password ) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db()

        const existingUser = await db.collection('User').findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'User is Exist' }, { status: 400 })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = {
            name,
            email,
            password: hashPassword,
            createdAt: new Date(),
        }
        await db.collection('User').insertOne(newUser);
        return NextResponse.json({ message: "User Create Successfully" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "User can not Create", error: error.message }, { status: 500 })
    }
}
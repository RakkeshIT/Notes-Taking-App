import clientPromise from "@/utils/connect";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description } = body;
    if (!title || !description) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const newData = {
      title,
      description,
      createdAt: new Date(),
    };
    await db.collection("Notes").insertOne(newData);
    return NextResponse.json(
      { message: "User Create Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "User can not Create", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const contents = await db.collection("Notes").find({}).toArray();
    return NextResponse.json(contents, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something Errors", error: error.message },
      { status: 500 }
    );
  }
}
// UPDATE API
export async function PUT(req:Request) {
    try {
        const {id,title,description} =await req.json();
      
        if(!id){
            alert("Id is Required")
        }
        const client = await clientPromise;
        const db = client.db();
        const update = await db.collection('Notes').updateOne(
            {_id: new ObjectId(id)},
            {$set: {title,description}}
        )
        if(update.matchedCount === 0 ){
            return NextResponse.json({message:"Content not Found"}, {status:404});
        }
        return NextResponse.json({message:"Content Updated"}, {status:200});
    } catch (error) {
        return NextResponse.json({message:"Content Not Updated", error:error.mesaage}, {status:500});
    }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ message: "ID is Required" }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    const contents = await db.collection("Notes").deleteOne({_id: new ObjectId(id)});
    return NextResponse.json(contents, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something Errors", error: error.message },
      { status: 500 }
    );
  }
}



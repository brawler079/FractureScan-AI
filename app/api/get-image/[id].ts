import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Image } from "@/app/model/Image";
import mongoose from "mongoose";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();

        if (!mongoose.Types.ObjectId.isValid(params.id)) {
            return NextResponse.json({ error: "Invalid image ID" }, { status: 400 });
        }

        const image = await Image.findById(params.id);
        if (!image) {
            return NextResponse.json({ error: "Image not found" }, { status: 404 });
        }

        return new NextResponse(image.data, {
            headers: {
                "Content-Type": "image/png",
            },
        });

    } catch (error) {
        console.error("Error fetching image:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Image } from "@/app/model/Image";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const { image, outputImageId } = await req.json();

        // ✅ Authenticate User
        const auth = getAuth(req);
        if (!auth.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }


        const imageBuffer = Buffer.from(image, "base64");

        // ✅ Save Image to MongoDB
        const newImage = new Image({
            userId: auth.userId,
            filename: `${outputImageId}.png`,
            data: imageBuffer,
            contentType: "image/png",
        });

        await newImage.save();
        return NextResponse.json({ message: "Image uploaded successfully!" });

    } catch (error) {
        console.error("Error uploading image:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

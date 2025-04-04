import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Image } from "@/app/model/Image";
import axios from "axios";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const { imageUrl, outputImageId } = await req.json();

        // ✅ Authenticate User
        const auth = getAuth(req);
        if (!auth.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // ✅ Validate the image URL
        if (!imageUrl || !imageUrl.startsWith("http")) {
            return NextResponse.json({ error: "Invalid image URL" }, { status: 400 });
        }

        // ✅ Fetch the image from the API
        const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

        if (response.status !== 200) {
            return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
        }

        const imageBuffer = Buffer.from(response.data); // Convert image to binary
        const contentType = response.headers["content-type"] || "image/png"; // Get content type

        // ✅ Save Image to MongoDB
        const newImage = new Image({
            userId: auth.userId,
            filename: `${outputImageId}.png`,
            data: imageBuffer,
            contentType,
        });

        await newImage.save();
        return NextResponse.json({ message: "Image uploaded successfully!" });

    } catch (error) {
        console.error("Error uploading image:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

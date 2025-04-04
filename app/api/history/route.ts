import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Image } from "@/app/model/Image";

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();
        const { userId } = getAuth(req);

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // ✅ Fetch all images for the authenticated user
        const images = await Image.find({ userId });

        if (!images.length) {
            return NextResponse.json({ message: "No images found", images: [] });
        }

        // ✅ Convert MongoDB binary data to a base64 URL
        const formattedImages = images.map((img) => {
            return {
                filename: img.filename,
                contentType: img.contentType || "image/png",
                imageUrl: `/api/user-images/${img._id}`, // Serve images via another API route
            };
        });

        return NextResponse.json({ images: formattedImages });

    } catch (error) {
        console.error("Error fetching user images:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

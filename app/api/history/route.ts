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

        // Fetch images for logged-in user
        const images = await Image.find({ userId }).select("_id filename");

        const formattedImages = images.map((img) => ({
            filename: img.filename,
            url: `/api/get-image/${img._id}`,  // API route to fetch image
        }));

        return NextResponse.json({ images: formattedImages });

    } catch (error) {
        console.error("Error fetching user images:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

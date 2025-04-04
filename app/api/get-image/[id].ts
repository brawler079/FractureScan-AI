import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Image } from "@/app/model/Image";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const { id } = params;

        const image = await Image.findById(id);
        if (!image) {
            return NextResponse.json({ error: "Image not found" }, { status: 404 });
        }

        return new NextResponse(image.data, {
            headers: {
                "Content-Type": image.contentType || "image/png",
            },
        });

    } catch (error) {
        console.error("Error serving image:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

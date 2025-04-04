import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongodb";
import { History } from "@/app/model/History";

export async function GET(req: NextRequest) {
  try {
    // Ensure DB is connected
    await connectToDatabase();

    // Get authenticated user
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch history for that user
    const historyRecords = await History.find({ userId }).sort({ createdAt: -1 });

    // Format for frontend
    const formattedHistory = historyRecords.map((record) => ({
      id: record._id.toString(),
      detected_bones: record.detected_bones,
      remedies: record.remedies,
      createdAt: record.createdAt,
    }));

    return NextResponse.json({ history: formattedHistory }, { status: 200 });

  } catch (error) {
    console.error("❌ Error fetching user history:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

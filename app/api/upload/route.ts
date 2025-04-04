import { History } from "@/app/model/History"; // Adjust the import path to point to your History model
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server"; // Import getAuth from Clerk

// POST handler for saving detected bones and remedies
export async function POST(req: NextRequest) {
    const body = await req.json();
    const { detected_bones, remedies, userId } = body;

    // Validate
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized: No user ID" }, { status: 401 });
    }
  
    if (!detected_bones || !Array.isArray(detected_bones) || detected_bones.length === 0) {
      return NextResponse.json({ message: "Invalid or no detected bones" }, { status: 400 });
    }
  
    if (!remedies || !Array.isArray(remedies)) {
      return NextResponse.json({ message: "Remedies must be an array" }, { status: 400 });
    }
  
    try {
      const mongoUri = process.env.MONGODB_URI;
      if (!mongoUri) return NextResponse.json({ message: "MongoDB URI not defined" }, { status: 500 });
  
      if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(mongoUri);
      }
  
      const newHistory = new History({
        detected_bones,
        remedies,
        userId, 
      });
  
      const savedHistory = await newHistory.save();
  
      return NextResponse.json({
        message: "Detection saved successfully!",
        data: savedHistory,
      }, { status: 201 });
  
    } catch (err) {
      console.error("Error saving detection:", err);
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
  }
  
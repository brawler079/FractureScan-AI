import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    filename: String,
    data: Buffer,
    contentType: String,
    createdAt: { type: Date, default: Date.now },
});

export const Image = mongoose.models.Image || mongoose.model("Image", ImageSchema);

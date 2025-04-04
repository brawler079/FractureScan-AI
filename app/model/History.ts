import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema({
  detected_bones: {
    type: [String],
    required: true,
  },
  remedies: {
    type: [String],
    required: true,
  },
  userId: {
    type: String,
    required: true, 
  },
}, { timestamps: true });

export const History = mongoose.models.History || mongoose.model("History", HistorySchema);

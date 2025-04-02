import { create } from "zustand";

interface PredictionState {
    detectedBones: string | null;
    outputImageId: string | null;
    remedies: string;
    setPrediction: (bones: string, imageId: string, remedy: string) => void;
}

export const usePredictionStore = create<PredictionState>((set) => ({
    detectedBones: null,
    outputImageId: null,
    remedies: "You are all good!",
    setPrediction: (bones, imageId, remedy) => set({ detectedBones: bones, outputImageId: imageId, remedies: remedy || "You are all good!" }),
}));

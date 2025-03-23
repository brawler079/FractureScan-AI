import { create } from "zustand";

interface PredictionState {
    detectedBones: string | null;
    outputImageId: string | null;
    setPrediction: (bones: string, imageId: string) => void;
}

export const usePredictionStore = create<PredictionState>((set) => ({
    detectedBones: null,
    outputImageId: null,
    setPrediction: (bones, imageId) => set({ detectedBones: bones, outputImageId: imageId }),
}));

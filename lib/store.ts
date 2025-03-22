import { create } from "zustand";

interface PredictionState {
    detectedBones: string | null;
    outputImage: string | null;
    setPrediction: (bones: string, image: string) => void;
}

export const usePredictionStore = create<PredictionState>((set) => ({
    detectedBones: null,
    outputImage: null,
    setPrediction: (bones, image) => set({ detectedBones: bones, outputImage: image }),
}));

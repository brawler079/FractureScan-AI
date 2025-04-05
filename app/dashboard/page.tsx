'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { usePredictionStore } from "@/lib/store";

const Dashboard = () => {
  const { isLoaded, userId } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setPrediction = usePredictionStore((state) => state.setPrediction);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file!");
      return;
    }

    if (!isLoaded || !userId) {
      setError("User not authenticated yet. Please wait...");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `https://d6c8-2409-40f4-ab-df5e-8914-cd9d-cfaf-5544.ngrok-free.app/predict`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { detected_bones, output_image_id, remedies } = response.data;

      // Handle case when no fracture is detected
      const bones = detected_bones.length > 0 ? detected_bones : ["No fracture detected"];
      const remedy = remedies.length > 0 ? remedies : ["No remedies necessary"];

      // Save to database regardless of result
      await axios.post("/api/upload", {
        detected_bones: bones,
        remedies: remedy,
        userId,
      });

      // Store result in frontend state
      setPrediction(bones, output_image_id, remedy);
      router.push("/output");

    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const message = err.response.data?.error || "Unexpected error occurred.";
        console.error("Upload Error:", message);
        setError(message);
      } else {
        console.error("Upload Error:", err);
        setError("Failed to process image. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center p-10">
      <div className="flex items-center justify-center gap-16 w-full">
        {preview ? (
          <img
            src={preview}
            alt="Selected Image"
            className="rounded-3xl shadow-2xl w-72 h-72 object-cover"
          />
        ) : (
          <Image
            src="/Demo.jpg"
            width={350}
            height={350}
            alt="Display Image"
            className="rounded-3xl shadow-2xl"
          />
        )}

        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold italic text-orange-800 leading-snug">
            Get Your Fracture Report Instantly
          </h1>
          <p className="text-lg text-gray-600 mt-4 leading-relaxed">
            Our AI-powered system uses machine learning algorithms to detect
            bone fractures with high accuracy. Simply upload your X-ray images
            and get instant results.
          </p>
        </div>
      </div>

      <div className="mt-12 bg-white shadow-2xl py-20 px-24 max-w-lg border border-gray-200 rounded-3xl flex flex-col items-center">
        <label className="cursor-pointer w-full">
          <div className="rounded-full bg-teal-500 py-4 px-8 text-white font-semibold 
            text-2xl text-center transition-transform transform hover:scale-105">
            {file ? file.name : "Choose an Image"}
          </div>
          <input
            type="file"
            className="hidden"
            onChange={handleInput}
            onClick={(e) => (e.currentTarget.value = '')}
          />
        </label>
        <button
          className="mt-4 bg-orange-700 text-white font-bold py-4 px-8 rounded-full
            transition-colors duration-300 hover:scale-105"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Processing..." : "Upload & Analyze"}
        </button>
        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
        <p className="mt-4 text-sm text-gray-500 italic">Upload your X-ray to analyze.</p>
      </div>
    </div>
  );
};

export default Dashboard;

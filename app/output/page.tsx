'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePredictionStore } from "@/lib/store";  

const OutputPage = () => {
    const { detectedBones, outputImageId } = usePredictionStore();
    const router = useRouter();
    const [outputImage, setOutputImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!outputImageId) {
            setError("No image ID found.");
            return;
        }

        const fetchImage = async () => {
            try {
                const response = await axios.get(
                    `https://13d8-2401-4900-889f-23b2-e9c3-9c09-1255-c290.ngrok-free.app/get-image/${outputImageId}`, 
                    { responseType: "blob" }
                );

                if (!response.data) {
                    throw new Error("No image data received.");
                }

                const imageUrl = URL.createObjectURL(response.data);
                setOutputImage(imageUrl);
            } catch (err) {
                console.error("Image Fetch Error:", err);
                setError("Failed to load processed image.");
            } finally {
                setLoading(false);
            }
        };

        fetchImage();
    }, [outputImageId]);

    return (
        <div className="h-screen w-full bg-gray-50 flex flex-col items-center justify-center p-10">
            <h1 className="text-5xl font-bold text-teal-700">Prediction Result</h1>

            {detectedBones ? (
                <div className="mt-6 bg-white shadow-lg p-8 rounded-3xl border border-gray-200 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Detected Fracture:</h2>
                    {<p className="text-lg font-semibold text-transform: capitalize text-gray-700 mt-2">{detectedBones}</p>}

                    {loading ? (
                        <p className="text-gray-500 mt-4">Loading processed image...</p>
                    ) : error ? (
                        <p className="text-red-500 mt-4">{error}</p>
                    ) : (
                        <div className="mt-4">
                            {outputImage && (
                                <Image src={outputImage} width={300} height={300} alt="Processed Image" className="rounded-lg shadow-md mt-2" />
                            )}
                        </div>
                    )}

                    <button onClick={() => router.push("/dashboard")} className="mt-6 bg-orange-600 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-orange-700 transition-transform transform hover:scale-105">
                        Upload Another Image
                    </button>
                </div>
            ) : (
                <p className="mt-6 text-gray-500">No prediction data found.</p>
            )}
        </div>
    );
};

export default OutputPage;

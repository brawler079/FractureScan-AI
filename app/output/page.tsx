'use client'
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const OutputPage = () => {
    const searchParams = useSearchParams();
    const detectedBones = searchParams.get("result");
    const outputImage = searchParams.get("image");
    const router = useRouter();

    return (
        <div className="h-screen w-full bg-gray-50 flex flex-col items-center justify-center p-10">
            <h1 className="text-5xl font-bold text-teal-700">Prediction Result</h1>

            {detectedBones ? (
                <div className="mt-6 bg-white shadow-lg p-8 rounded-3xl border border-gray-200 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Detected Fracture:</h2>
                    <p className="text-lg text-gray-700 mt-2">{detectedBones}</p>

                    {outputImage && (
                        <div className="mt-4">
                            <h3 className="text-lg text-gray-600">Processed Image:</h3>
                            <Image
                                src={`http://127.0.0.1:8000/images/${outputImage}.png`}
                                width={300}
                                height={300}
                                alt="Processed Image"
                                className="rounded-lg shadow-md mt-2"
                            />
                        </div>
                    )}

                    <button
                        onClick={() => router.push("/")}
                        className="mt-6 bg-orange-600 text-white py-3 px-6 rounded-full text-lg font-semibold 
                        hover:bg-orange-700 transition-transform transform hover:scale-105"
                    >
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

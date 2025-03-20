'use client'
import Image from "next/image";
import axios from 'axios';
import { useState } from "react";

const Dashboard = () => {

    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    }

    const handleUpload = async () => {
        if(!file) {
            setError('Please select a file!');
        }

        const formData = new FormData();
        if (file) {
            formData.append("file", file);
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("http://127.0.0.1:8000/predict", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        } catch (err) {
            setError("Failed to process image. Please try again.");
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="min-h-screen w-full bg-gray-50 relative flex flex-col items-center justify-center p-10">
            <div className="flex items-center justify-center gap-16 w-full">
                <Image
                    src="/Demo.jpg"
                    width={350}
                    height={350}
                    alt="Demo Image"
                    className="rounded-3xl shadow-2xl"
                />

                <div className="max-w-2xl">
                    <h1 className="text-5xl text-balance mx-12 font-bold italic text-orange-800 leading-snug">
                        Get Your Fracture Report Instantly
                    </h1>
                    <p className="text-lg text-gray-600 mt-4 mx-10 leading-relaxed">
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
                    <input type="file" className="hidden" onChange={handleInput} />
                </label>
                <button className="mt-4 bg-orange-700 text-white font-bold py-4 px-8 rounded-full
                transition-colors duration-300 hover:scale-105"
                onClick={handleUpload}
                disabled={loading}
                >
                    {loading ? "Processing..." : "Upload & Analyze"}
                </button>
                {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
                <p className="mt-4 text-sm text-gray-500 italic">Upload your X-ray to analyze.</p>
            </div>

            <div className="absolute top-10 right-16 w-24 h-24 bg-pink-500 opacity-40 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-green-500 opacity-40 rounded-full blur-2xl"></div>
            <div className="absolute bottom-[30%] right-[17%] w-20 h-20 bg-blue-500 opacity-30 rounded-full blur-2xl"></div>
        </div>
    );
};

export default Dashboard;

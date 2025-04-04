"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { usePredictionStore } from "@/lib/store";
import Image from "next/image";

const OutputPage = () => {
    const { detectedBones, outputImageId, remedies } = usePredictionStore();
    const router = useRouter();
    const [chatMessages, setChatMessages] = useState<{ sender: "bot" | "user"; text: string }[]>([]);
    const [userMessage, setUserMessage] = useState("");

    useEffect(() => {
        if (remedies) {
            setChatMessages([{ sender: "bot", text: `Recommended Remedies: ${remedies}` }]);
        }
    }, [remedies]);

    const handleSendMessage = async () => {
        if (!userMessage.trim()) return;

        const newMessages: { sender: "bot" | "user"; text: string }[] = [...chatMessages, { sender: "user", text: userMessage }];
        setChatMessages(newMessages);
        setUserMessage("");

        try {
            const response = await axios.post(
                "https://90fd-2401-4900-1c29-31e0-e591-42f5-4bf1-c646.ngrok-free.app/chat",
                null,
                { params: { user_input: userMessage } }
            );

            setChatMessages([...newMessages, { sender: "bot", text: response.data.response }]);
        } catch (err) {
            console.error("Chatbot Error:", err);
            setChatMessages([...newMessages, { sender: "bot", text: "Sorry, I couldn't understand that." }]);
        }
    };

    return (
        <div className="h-screen w-full bg-gray-50 flex p-10 gap-8">
            {/* Left Section: Prediction Result */}
            <div className="w-3/5 flex flex-col items-center">
                <h1 className="text-5xl font-bold text-teal-700">Prediction Result</h1>

                {detectedBones ? (
                    <div className="mt-6 bg-white shadow-lg p-8 rounded-3xl border border-gray-200 text-center w-full max-w-md">
                        <h2 className="text-2xl font-bold text-gray-800">Detected Fracture:</h2>
                        <p className="text-lg font-semibold capitalize text-gray-700 mt-2">{detectedBones}</p>

                        <div className="mt-4">
                            {outputImageId ? (
                                <Image
                                src={`https://90fd-2401-4900-1c29-31e0-e591-42f5-4bf1-c646.ngrok-free.app/get-image/${outputImageId}`}
                                alt="Processed Image"
                                className="rounded-2xl shadow-lg mx-auto" 
                                width={256}
                                height={256}
                                unoptimized  
                            />
                            ) : (
                                <p className="text-red-500 mt-4">Processed image not available.</p>
                            )}
                        </div>

                        <button
                            onClick={() => router.push("/dashboard")}
                            className="mt-6 bg-orange-600 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-orange-700 transition-transform transform hover:scale-105"
                        >
                            Upload Another Image
                        </button>
                    </div>
                ) : (
                    <p className="mt-6 text-gray-500">No prediction data found.</p>
                )}
            </div>

            {/* Right Section: Chatbot */}
            <div className="w-2/5 bg-white shadow-2xl p-6 rounded-xl border border-gray-200 flex flex-col">
                <h2 className="text-2xl font-bold text-gray-800">AI Health Assistant</h2>

                {/* Chat Messages Container */}
                <div className="flex-grow overflow-y-auto h-[400px] border rounded-2xl p-4 mt-2 space-y-2 flex flex-col">
                    {chatMessages.map((msg, index) => (
                        <div
                            key={index}
                            className={`py-2 px-4 rounded-lg max-w-[75%] ${
                                msg.sender === "user"
                                    ? "bg-teal-300 text-right self-end rounded-3xl"
                                    : "bg-gray-300 text-left self-start rounded-3xl"
                            }`}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>

                {/* Input Field & Send Button */}
                <div className="flex mt-4">
                    <input
                        type="text"
                        className="flex-grow border rounded-xl p-2"
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        placeholder="Ask me anything..."
                    />
                    <button
                        onClick={handleSendMessage}
                        className="bg-teal-700 text-white px-4 py-2 rounded-xl ml-2"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OutputPage;

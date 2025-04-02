'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePredictionStore } from "@/lib/store";

const OutputPage = () => {
    const { detectedBones, outputImageId, remedies } = usePredictionStore();
    const router = useRouter();
    const [outputImage, setOutputImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Chatbot state
    const [chatMessages, setChatMessages] = useState<{ sender: "bot" | "user"; text: string }[]>([]);
    const [userMessage, setUserMessage] = useState("");

    useEffect(() => {
        if (!outputImageId) {
            setError("No image ID found.");
            return;
        }

        const fetchImage = async () => {
            try {
                const response = await axios.get(
                    `https://b2f3-43-239-201-155.ngrok-free.app/get-image/${outputImageId}`,
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

        

        // Initialize chatbot with remedies
        if (remedies) {
            setChatMessages([{ sender: "bot" as "bot", text: `Recommended Remedies: ${remedies}` }]);
        }
    }, [outputImageId]);

    const handleSendMessage = async () => {
        if (!userMessage.trim()) return;
    
        const newMessages = [...chatMessages, { sender: "user" as "user", text: userMessage }];
        setChatMessages(newMessages);
        setUserMessage("");
    
        try {
            const response = await axios.post("https://b2f3-43-239-201-155.ngrok-free.app/chat", null, {
                params: { user_input: userMessage }
            });
    
            const botReply = response.data.response;
    
            setChatMessages([...newMessages, { sender: "bot" as "bot", text: botReply }]);
        } catch (err) {
            console.error("Chatbot Error:", err);
            setChatMessages([...newMessages, { sender: "bot" as "bot", text: "Sorry, I couldn't understand that." }]);
        }
    };
    

    return (
        <div className="h-screen w-full bg-gray-50 flex p-10">
            {/* Left Section: Prediction Result */}
            <div className="w-3/5 flex flex-col items-center">
                <h1 className="text-5xl font-bold text-teal-700">Prediction Result</h1>

                {detectedBones ? (
                    <div className="mt-6 bg-white shadow-lg p-8 rounded-3xl border border-gray-200 text-center">
                        <h2 className="text-2xl font-bold text-gray-800">Detected Fracture:</h2>
                        <p className="text-lg font-semibold capitalize text-gray-700 mt-2">{detectedBones}</p>

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

            {/* Right Section: Chatbot */}
            <div className="w-2/5 bg-white shadow-2xl p-6 rounded-xl border border-gray-200 flex flex-col">
                <h2 className="text-2xl font-bold text-gray-800">AI Health Assistant</h2>

                {/* Chat Messages Container */}
                <div className="flex-grow overflow-y-auto h-[400px] border rounded-2xl p-4 mt-2 space-y-2 flex flex-col">
                    {chatMessages.map((msg, index) => (
                        <div
                            key={index}
                            className={`py-2 px-4  rounded-lg max-w-[75%] ${msg.sender === "user"
                                    ? "bg-teal-300 text-right self-end rounded-full"  
                                    : "bg-gray-300 text-left self-start rounded-full" 
                                }`}>
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

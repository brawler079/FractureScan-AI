"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

const HistoryPage = () => {
    const { getToken, userId } = useAuth();
    const [images, setImages] = useState<{ filename: string; url: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchImages = async () => {
          if (!userId) return;
          setLoading(true);
  
          try {
              const token = await getToken();
              const response = await axios.get("/api/history", {
                  headers: { Authorization: `Bearer ${token}` },
              });
  
              console.log("Fetched images:", response.data.images);  // Debugging
              setImages(response.data.images);
          } catch (err) {
              console.error("Error fetching images:", err);
              setError("Failed to load images.");
          } finally {
              setLoading(false);
          }
      };
  
      fetchImages();
  }, [userId]);
  

    return (
        <div className="h-screen w-full bg-gray-100 flex flex-col items-center p-10">
            <h1 className="text-4xl font-bold text-teal-700">Your Upload History</h1>

            {loading ? (
                <p className="text-gray-500 mt-6">Loading images...</p>
            ) : error ? (
                <p className="text-red-500 mt-6">{error}</p>
            ) : images.length > 0 ? (
                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {images.map(({ filename, url }, index) => (
                        <div key={index} className="bg-white shadow-lg p-4 rounded-lg">
                            <img
                                src={url} 
                                alt={filename}
                                className="w-48 h-48 object-cover rounded-md border border-gray-200"
                            />
                            <p className="text-center mt-2 text-gray-700">{filename}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 mt-6">No images found.</p>
            )}
        </div>
    );
};

export default HistoryPage;

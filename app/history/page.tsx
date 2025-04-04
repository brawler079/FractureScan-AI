'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

type HistoryData = {
  id: string;
  detected_bones: string[];
  remedies: string[];
  createdAt: string;
};

const HistoryPage = () => {
  const { getToken, userId } = useAuth();
  const [history, setHistory] = useState<HistoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId) return;

      setLoading(true);
      try {
        const token = await getToken();
        const response = await axios.get("/api/history", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setHistory(response.data.history);
      } catch (err) {
        console.error("❌ Error fetching history:", err);
        setError("Failed to load history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId]);

  return (
    <div className="min-h-screen w-full bg-gray-50 p-10 flex flex-col items-center">
      <h1 className="text-5xl font-bold text-teal-700 mb-10">Your Bone Fracture History</h1>

      {loading ? (
        <p className="text-lg text-gray-500 animate-pulse">Fetching your medical journey...</p>
      ) : error ? (
        <p className="text-red-600 text-lg">{error}</p>
      ) : history.length > 0 ? (
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {history.map(({ id, detected_bones, remedies, createdAt }, index) => (
            <div
              key={id}
              className="bg-white border border-gray-200 rounded-3xl shadow-lg p-6 hover:shadow-xl transition-shadow flex flex-col"
            >
              <h2 className="text-2xl font-semibold text-teal-600 mb-4">Detection #{index + 1}</h2>

              <div className="mb-4">
                <p className="text-gray-600 font-medium">Detected Bones:</p>
                <ul className="list-disc list-inside text-gray-800 ml-2 mt-1">
                  {detected_bones.length > 0 ? (
                    detected_bones.map((bone, i) => <li key={i}>{bone}</li>)
                  ) : (
                    <li>No fracture detected</li>
                  )}
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-gray-600 font-medium">Remedies:</p>
                <ul className="list-disc list-inside text-gray-800 ml-2 mt-1">
                  {remedies.length > 0 ? (
                    remedies.map((remedy, i) => <li key={i}>{remedy}</li>)
                  ) : (
                    <li>No remedies available</li>
                  )}
                </ul>
              </div>

              <p className="text-sm text-gray-500 mt-auto">Uploaded: {new Date(createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg text-gray-500">You haven’t uploaded any X-rays yet. Let’s fix that!</p>
      )}
    </div>
  );
};

export default HistoryPage;

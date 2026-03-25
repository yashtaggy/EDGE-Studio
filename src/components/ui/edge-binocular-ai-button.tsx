"use client";

import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";

export default function EdgeBinocularAIButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");

  return (
    <>
      {/* ✅ AI Search Box */}
      <div
        onClick={() => setIsOpen(true)}
        className="w-full max-w-xl cursor-text flex items-center gap-3
        bg-black border border-gray-700 rounded-full pr-4 pl-0 py-0
        shadow-sm hover:border-gray-500 transition relative"
      >
        {/* ✅ Left: Enlarged Logo (Height matches input) */}
        <div className="relative w-14 h-14 min-w-[56px] rounded-full overflow-hidden border-2 border-red-500">
          <Image
            src="/Binocular_bg.png"
            alt="EDGE AI"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* ✅ Input + Custom Placeholder Wrapper */}
        <div className="relative flex-1">
          {/* ✅ Custom Placeholder */}
          {!prompt && (
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none text-lg">
              <span className="text-gray-400 mr-1">Ask</span>
              <span className="text-red-500 font-semibold mr-1">EDGE</span>
              {/* <span className="text-gray-400">anything…</span> */}
            </div>
          )}

          {/* ✅ Actual Input */}
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full bg-transparent text-white outline-none text-lg py-4"
          />
        </div>

        {/* ✅ Search Icon */}
        <Search className="text-gray-300 w-6 h-6" />
      </div>

      {/* ✅ Modal (unchanged behavior) */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[350px]">
            <h2 className="text-xl font-semibold mb-3">
              EDGE Binocular AI
            </h2>
            <p className="text-gray-600 mb-4">
              Your AI assistant will appear here once Blueverse Agent is connected.
            </p>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full border border-gray-400 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

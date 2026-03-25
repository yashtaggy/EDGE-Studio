"use client";

import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";

export default function EdgeBinocularAIButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* AI Search Bar Button */}
      <div
        onClick={() => setIsOpen(true)}
        className="w-full max-w-xl cursor-pointer flex items-center justify-between 
        bg-black border border-gray-700 rounded-full px-4 py-2 shadow-sm 
        hover:border-gray-500 transition"
      >
        {/* Left: Avatar + Text */}
        <div className="flex items-center gap-3">
          {/* Circle Avatar */}
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-red-500">
            <Image
              src="/edge-avatar.png" // add your image here in /public
              alt="AI Profile"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>

          {/* Text */}
          <p className="text-white text-lg font-medium">
            Ask <span className="text-red-500">EDGE</span>
          </p>
        </div>

        {/* Right Icon */}
        <Search className="text-gray-300 w-6 h-6" />
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[350px]">
            <h2 className="text-xl font-semibold mb-3">EDGE Binocular AI</h2>
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
``
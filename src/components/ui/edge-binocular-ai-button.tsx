"use client";

import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EdgeBinocularAIButton() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && prompt.trim()) {
      window.open('https://m365.cloud.microsoft/chat/?titleId=T_c51a20dd-173e-b921-6727-b83a315fcdb4&source=embedded-builder', '_blank');
      setPrompt('');
    }
  };

  return (
    <div
      className="
        w-full max-w-xl flex items-center gap-3
        bg-black border border-gray-700 rounded-full
        pr-4 pl-0 py-0
        shadow-sm hover:border-gray-500 transition
      "
    >
      {/* Left: EDGE Binocular Logo */}
      <div className="relative w-14 h-14 min-w-[56px] rounded-full overflow-hidden border-2 border-red-500">
        <Image
          src="/Binocular_bg.png"
          alt="EDGE AI"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Input + Custom Placeholder */}
      <div className="relative flex-1">
        {!prompt && (
          <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none text-lg">
            <span className="text-gray-400 mr-1">Ask</span>
            <span className="text-red-500 font-semibold">EDGE</span>
          </div>
        )}

        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-white outline-none text-lg py-4"
        />
      </div>

      {/* Search Icon */}
      <Search className="text-gray-300 w-6 h-6" />
    </div>
  );
}
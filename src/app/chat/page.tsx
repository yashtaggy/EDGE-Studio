import { Suspense } from "react";
import ChatClient from "./chat-client";

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black text-gray-400">
          Loading EDGE…
        </div>
      }
    >
      <ChatClient />
    </Suspense>
  );
}
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Send,
  MessageCircle,
  User,
  Bot,
  Loader2,
} from "lucide-react";

type Message = {
  role: "user" | "agent";
  content: string;
};

export default function ChatClient() {
  const searchParams = useSearchParams();
  const initialPrompt = searchParams.get("prompt");

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasRequested = useRef(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // ✅ Initial prompt (Strict‑Mode + production safe)
  useEffect(() => {
    if (!initialPrompt || hasRequested.current) return;
    hasRequested.current = true;

    const sendInitial = async () => {
      setMessages([{ role: "user", content: initialPrompt }]);
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: initialPrompt }),
        });
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { role: "agent", content: data.reply },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "agent",
            content: "Something went wrong while contacting EDGE.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    sendInitial();
  }, [initialPrompt]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
    ]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "agent", content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          content: "Something went wrong while contacting EDGE.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const TypingIndicator = () => (
    <div className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <Avatar className="h-8 w-8 flex-shrink-0">
        <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <Bot className="h-4 w-4 text-white" />
        </div>
      </Avatar>
      <div className="flex gap-1 p-3 bg-gray-900 rounded-2xl rounded-br-xl">
        <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" />
        <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.1s]" />
        <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white flex flex-col">

      {/* Header */}
      <header className="sticky top-0 z-50 h-16 bg-black/80 backdrop-blur-md border-b border-gray-800 flex items-center px-6 shadow-lg">
        <MessageCircle className="h-6 w-6 text-red-500 mr-2" />
        <h1 className="text-xl font-bold">
          Ask <span className="text-red-500">EDGE</span>
        </h1>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            } animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div className="max-w-3xl flex gap-3">
              <Avatar>
                {msg.role === "user" ? (
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                ) : (
                  <AvatarFallback className="bg-red-500">
                    <Bot />
                  </AvatarFallback>
                )}
              </Avatar>
              <div
                className={`p-5 rounded-3xl shadow-xl ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-blue-500 to-purple-600"
                    : "bg-gray-800/70 backdrop-blur-md"
                }`}
              >
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {loading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </main>

      {/* Input */}
      <footer className="sticky bottom-0 bg-gray-900/95 border-t border-gray-800 p-4">
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto flex gap-2"
        >
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send a message..."
            rows={1}
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <Button type="submit" disabled={loading || !input.trim()}>
            {loading ? <Loader2 className="animate-spin" /> : <Send />}
          </Button>
        </form>
      </footer>
    </div>
  );
}

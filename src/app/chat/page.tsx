"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, MessageCircle, User, Bot, Paperclip, Loader2 } from "lucide-react";

type Message = {
  role: "user" | "agent";
  content: string;
};

export default function ChatPage() {
  const searchParams = useSearchParams();
  const initialPrompt = searchParams.get("prompt");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Initial prompt handling
  useEffect(() => {
    if (!initialPrompt) return;

    const sendInitial = async () => {
      setMessages([{ role: "user" as const, content: initialPrompt }]);
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: initialPrompt }),
        });
        const data = await res.json();
        setMessages((prev) => [...prev, { role: "agent" as const, content: data.reply }]);
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "agent" as const, content: "Something went wrong while contacting EDGE." },
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

    const userMessage: Message = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "agent" as const, content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "agent" as const, content: "Something went wrong while contacting EDGE." },
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
        <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0s]" />
        <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.1s]" />
        <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 h-16 bg-black/80 backdrop-blur-md border-b border-gray-800 flex items-center px-6 shadow-lg">
        <div className="flex items-center gap-3">
          <MessageCircle className="h-6 w-6 text-red-500" />
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Ask <span className="text-red-500">EDGE</span>
          </h1>
        </div>
      </header>

      {/* Messages Container */}
      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 space-y-4 animate-in fade-in zoom-in duration-500">
              <MessageCircle className="h-16 w-16 opacity-50" />
              <h2 className="text-2xl font-semibold">Welcome to EDGE Chat</h2>
              <p className="max-w-md">Start a conversation by typing a message below.</p>
            </div>
          ) : (
            <>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                >
                  <div className={`max-w-3xl flex ${msg.role === "user" ? "flex-row-reverse gap-3" : "gap-3"}`}>
                    <Avatar className="h-10 w-10 flex-shrink-0 order-first md:order-last">
                      {msg.role === "user" ? (
                        <>
                          <AvatarImage src="/api/placeholder-image" />
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">
                            <User className="h-5 w-5" />
                          </AvatarFallback>
                        </>
                      ) : (
                        <div className="h-10 w-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                          <Bot className="h-5 w-5 text-white" />
                        </div>
                      )}
                    </Avatar>
                    <div
                      className={`p-5 rounded-3xl shadow-xl max-w-lg leading-relaxed ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-blue-500/25"
                          : "bg-gray-800/50 backdrop-blur-md border border-gray-700/50 text-white"
                      } ${msg.role === "user" ? "rounded-bl-xl" : "rounded-br-xl"}`}
                    >
                      <p>{msg.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              {loading && <TypingIndicator />}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Footer */}
      <footer className="sticky bottom-0 z-40 bg-gray-900/95 backdrop-blur-md border-t border-gray-800 p-4 shadow-2xl">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex items-end gap-2">
          <div className="flex-1 min-w-0">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Send a message..."
              rows={1}
              disabled={loading}
              className="min-h-[44px] max-h-[200px] resize-none focus-visible:ring-2 focus-visible:ring-red-500/50"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !loading) {
                  e.preventDefault();
                  handleSubmit(e as any);
                }
              }}
            />
          </div>
          <Button
            type="submit"
            size="icon"
            variant={input.trim() && !loading ? "default" : "ghost"}
            disabled={!input.trim() || loading}
            className="h-12 w-12 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 flex-shrink-0"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </form>
        <p className="text-xs text-gray-500 text-center mt-2">
          ⌘ + Enter for new line
        </p>
      </footer>
    </div>
  );
}

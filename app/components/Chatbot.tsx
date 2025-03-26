"use client";

import { useState, FormEvent } from "react";
import { FaRobot, FaUser, FaPaperPlane, FaTimes } from "react-icons/fa";
import { Typewriter } from "nextjs-simple-typewriter";
import generateText from "../database/handlers/generateText";

// Define the message type for the chat history
interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "Hi! I'm Cura's AI assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat history
    const userMessage: ChatMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Send query to the API route
      const response = await generateText({
        input,
        previousMessages: messages,
      });

      // Add bot response to chat history
      const botMessage: ChatMessage = {
        sender: "bot",
        text: response || "Sorry, I couldn't generate a response.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (e) {
      const errorMessage: ChatMessage = {
        sender: "bot",
        text: "Sorry, I couldn't process your request. Please try again. " + e,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-6 z-50 w-[90%] sm:w-3/5 lg:w-1/2">
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-circle btn-primary shadow-lg  absolute right-0 bottom-0"
        >
          <FaRobot size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="card bg-base-100 shadow-xl h-[60vh] min-h-[30rem] flex flex-col absolute right-0 bottom-0">
          {/* Header */}
          <div className="p-4 bg-primary text-white rounded-t-lg flex justify-between items-center">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <FaRobot /> AI Chatbot
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-ghost btn-sm"
            >
              <FaTimes />
            </button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat ${
                  message.sender === "user" ? "chat-end" : "chat-start"
                }`}
              >
                <div className="chat-image avatar">
                  <div className="w-8 rounded-full">
                    {message.sender === "user" ? (
                      <FaUser className="text-primary" />
                    ) : (
                      <FaRobot className="text-secondary" />
                    )}
                  </div>
                </div>
                <div
                  className={`chat-bubble ${
                    message.sender === "user"
                      ? "bg-primary text-white"
                      : "bg-secondary text-white"
                  }`}
                >
                  {message.sender === "bot" && messages.length - 1 === index ? (
                    <Typewriter words={[message.text]} typeSpeed={15} />
                  ) : (
                    message.text
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-8 rounded-full">
                    <FaRobot className="text-secondary" />
                  </div>
                </div>
                <div className="chat-bubble bg-secondary text-white">
                  <span className="loading loading-dots loading-sm"></span>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="p-4 flex items-center gap-2 border-t border-writing/30"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="input caret-primary flex-1 text-sm border border-writing/30 focus:outline-0"
              disabled={loading}
            />
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={loading}
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

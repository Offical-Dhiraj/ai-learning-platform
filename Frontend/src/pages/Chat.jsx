import { useEffect, useRef, useState } from "react";
import { Bot, Send } from "lucide-react";

import Navbar from "@/components/Navbar";

import { sendMessageAPI, getHistoryAPI } from "@/features/chat/chat.api";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const loadHistory = async () => {
    try {
      const res = await getHistoryAPI();

      const temp = [];

      res.chats.forEach((chat) => {
        temp.push({
          role: "user",
          content: chat.question,
        });

        temp.push({
          role: "assistant",
          content: chat.answer,
        });
      });

      setMessages(temp);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const text = message;

    setMessage("");

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: text,
      },
    ]);

    setLoading(true);

    try {
      const res = await sendMessageAPI(text);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res.answer,
        },
      ]);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    }

    setLoading(false);
  };

  const suggestions = [
    "Explain DBMS",
    "Java Interview Questions",
    "React Hooks",
    "TCS NQT Tips",
    "Create DSA Study Plan",
    "OS Interview Questions",
  ];

  return (
    <>
      {" "}
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-white flex flex-col">
        {/* HERO SECTION */}

        {messages.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
            <div className="w-24 h-24 rounded-full bg-cyan-500/10 flex items-center justify-center mb-8">
              <Bot size={48} className="text-cyan-400" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-center mb-4">
              AI Learning Assistant
            </h1>

            <p className="text-gray-400 text-center max-w-2xl text-lg md:text-xl mb-12">
              Learn DSA, Java, React, DBMS, OS, CN, Aptitude and Placement
              Preparation with AI.
            </p>

            <div className="grid md:grid-cols-2 gap-4 w-full max-w-4xl"></div>
          </div>
        )}

        {/* CHAT AREA */}

        {messages.length > 0 && (
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-4 py-8">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex mb-6 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* AI MESSAGE */}

                  {msg.role === "assistant" ? (
                    <div
                      className="
                      max-w-[90%]
                      md:max-w-[80%]
                      bg-slate-900
                      border
                      border-slate-800
                      rounded-3xl
                      rounded-bl-md
                      p-5
                      shadow-lg
                      "
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Bot size={18} className="text-cyan-400" />

                        <span className="text-sm text-gray-400">
                          AI Assistant
                        </span>
                      </div>

                      <p
                        className="
                        whitespace-pre-wrap
                        leading-8
                        text-gray-200
                        "
                      >
                        {msg.content}
                      </p>
                    </div>
                  ) : (
                    /* USER MESSAGE */

                    <div
                      className="
                      max-w-[80%]
                      md:max-w-[60%]
                      bg-gradient-to-r
                      from-cyan-500
                      to-blue-500
                      rounded-3xl
                      rounded-br-md
                      p-4
                      shadow-lg
                      "
                    >
                      <p>{msg.content}</p>
                    </div>
                  )}
                </div>
              ))}

              {/* TYPING ANIMATION */}

              {loading && (
                <div className="flex justify-start mb-6">
                  <div
                    className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-3xl
                    rounded-bl-md
                    p-5
                    "
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Bot size={18} className="text-cyan-400" />

                      <span className="text-sm text-gray-400">
                        AI Assistant
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <span className="animate-bounce">●</span>

                      <span
                        className="animate-bounce"
                        style={{
                          animationDelay: "0.15s",
                        }}
                      >
                        ●
                      </span>

                      <span
                        className="animate-bounce"
                        style={{
                          animationDelay: "0.3s",
                        }}
                      >
                        ●
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        {/* INPUT SECTION */}

        {/* <div className="sticky bottom-0 bg-slate-950 border-t border-slate-800">
          <div className="max-w-4xl mx-auto p-4">
            <div
              className="
              flex
              items-center
              gap-3
              bg-slate-900
              border
              border-slate-800
              rounded-2xl
              p-3
              "
            >
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                placeholder="Ask anything about DSA, Java, DBMS..."
                className="
                flex-1
                bg-transparent
                outline-none
                px-3
                text-white
                "
              />

              <button
                onClick={sendMessage}
                disabled={loading}
                className="
                w-12
                h-12
                rounded-xl
                bg-cyan-500
                hover:bg-cyan-600
                disabled:opacity-50
                flex
                items-center
                justify-center
                transition
                "
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div> */}

        <div className="fixed bottom-0 left-0 right-0 bg-slate-950 border-t border-slate-800 z-50">
          <div className="max-w-4xl mx-auto p-3">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-2xl p-2">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                placeholder="Ask anything..."
                className="flex-1 bg-transparent outline-none px-3 text-white text-sm md:text-base"
              />

              <button
                onClick={() => {
                  sendMessage();
                }}
                disabled={loading}
                className="
  min-w-[48px]
  min-h-[48px]
  rounded-xl
  bg-cyan-500
  flex
  items-center
  justify-center
  "
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

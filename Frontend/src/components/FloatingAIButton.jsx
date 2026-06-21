import { Bot } from "lucide-react";

export default function FloatingAIButton() {
  return (
    <button
      onClick={() => {
        window.location.href = "/chat";
      }}
      className="
      fixed
      bottom-6
      right-6
      z-50
      bg-purple-600
      text-white
      p-4
      rounded-full
      shadow-lg
      hover:scale-110
      transition
      "
    >
      <Bot size={28} />
    </button>
  );
}

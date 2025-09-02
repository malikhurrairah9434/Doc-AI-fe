"use client"
import { useState } from "react"

type Message = {
  sender: "user" | "bot"
  text: string
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "👋 Hello! I’m your AI health assistant. How can I help you today?" }
  ])
  const [input, setInput] = useState("")

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    setMessages(prev => [...prev, { sender: "user", text: input }])

    // Mock bot response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: `💊 Suggestion for "${input}": Stay hydrated and rest. ⚠️ Please consult a doctor before taking any medication.` }
      ])
    }, 1000)

    setInput("")
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-100">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs text-sm whitespace-pre-line ${
                msg.sender === "user"
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-white shadow text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 bg-white flex gap-2 border-t">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your health issue..."
          className="flex-1 border rounded-xl p-2 focus:outline-none focus:ring focus:ring-indigo-200"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 rounded-xl hover:bg-indigo-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  )
}

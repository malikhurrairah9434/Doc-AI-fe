"use client"
import { useState, useRef, useEffect } from "react"
import { Plus, MessageSquare, Send, Settings, Moon, Sun, Archive, Trash2, Download, Copy, Heart, Bookmark } from "lucide-react"

type Message = {
  sender: "user" | "bot"
  text: string
  timestamp: Date
  typing?: boolean
  medicineImage?: string
  medicineName?: string
  liked?: boolean
  bookmarked?: boolean
}

type Chat = {
  id: number
  title: string
  history: Message[]
  lastActive: Date
  pinned?: boolean
}

const MEDICINE_DATABASE = {
  "headache": { name: "Ibuprofen", image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=200&h=150&fit=crop" },
  "fever": { name: "Paracetamol", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=150&fit=crop" },
  "cough": { name: "Dextromethorphan", image: "https://images.unsplash.com/photo-1576669801775-ff43c5ab079d?w=200&h=150&fit=crop" },
  "cold": { name: "Phenylephrine", image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=150&fit=crop" },
  "pain": { name: "Aspirin", image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=200&h=150&fit=crop" },
  "stomach": { name: "Omeprazole", image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&h=150&fit=crop" },
  "allergy": { name: "Loratadine", image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=200&h=150&fit=crop" },
  "nausea": { name: "Ondansetron", image: "https://images.unsplash.com/photo-1576669801775-ff43c5ab079d?w=200&h=150&fit=crop" },
  "insomnia": { name: "Melatonin", image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=200&h=150&fit=crop" }
}

export default function ModernDocAIChatBox() {
  const [darkMode, setDarkMode] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "👋 Hello! I'm DocAI, your intelligent health assistant powered by advanced AI. I can help you with:\n\n🏥 Medication information & interactions\n🔍 Symptom analysis & guidance  \n📚 Health condition explanations\n💊 Treatment recommendations with medicine images\n📋 Personalized health insights\n\nWhat symptoms are you experiencing today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [chats, setChats] = useState<Chat[]>([])
  const [activeChat, setActiveChat] = useState<number | null>(null)
  const [showSettings, setShowSettings] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const findMedicine = (text: string) => {
    const lowerText = text.toLowerCase()
    for (const [symptom, medicine] of Object.entries(MEDICINE_DATABASE)) {
      if (lowerText.includes(symptom)) {
        return medicine
      }
    }
    return null
  }

  const generateResponse = (userInput: string) => {
    const medicine = findMedicine(userInput)
    let response = `🔍 Based on your query about "${userInput}", here's my analysis:\n\n`
    
    if (medicine) {
      response += `💊 **Recommended Medicine**: ${medicine.name}\n\n`
    }
    
    response += `• This appears to be a common health concern\n• Stay hydrated and get adequate rest\n• Monitor your symptoms closely\n• Consider lifestyle modifications\n\n⚠️ **Important**: This information is for educational purposes only. Always consult with a healthcare professional for proper diagnosis and treatment.`
    
    return { text: response, medicine }
  }

  const handleNewChat = () => {
    const newChatId = Date.now()
    const newChat: Chat = {
      id: newChatId,
      title: "New Health Consultation",
      history: [],
      lastActive: new Date()
    }
    setChats((prev) => [newChat, ...prev])
    setActiveChat(newChatId)
    setMessages([
      {
        sender: "bot",
        text: "👋 Hello! I'm DocAI, your intelligent health assistant. What symptoms would you like to discuss?",
        timestamp: new Date(),
      },
    ])
  }

  const handleSend = () => {
    if (!input.trim() || isTyping) return

    const userMessage: Message = { sender: "user", text: input, timestamp: new Date() }
    setMessages((prev) => [...prev, userMessage])
    
    const currentInput = input
    setInput("")
    setIsTyping(true)

    // Add typing indicator
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: "", timestamp: new Date(), typing: true }])
    }, 800)

    // Generate and show response
    setTimeout(() => {
      const { text, medicine } = generateResponse(currentInput)
      setMessages((prev) => {
        const newMessages = prev.filter((msg) => !msg.typing)
        return [
          ...newMessages,
          {
            sender: "bot",
            text,
            timestamp: new Date(),
            medicineImage: medicine?.image,
            medicineName: medicine?.name,
          },
        ]
      })
      setIsTyping(false)
    }, 2500)

    // Update chat title based on first message
    if (activeChat && chats.find(c => c.id === activeChat)?.history.length === 0) {
      setChats(prev => prev.map(chat => 
        chat.id === activeChat 
          ? { ...chat, title: currentInput.slice(0, 30) + "...", lastActive: new Date() }
          : chat
      ))
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const toggleLike = (messageIndex: number) => {
    setMessages(prev => prev.map((msg, idx) => 
      idx === messageIndex ? { ...msg, liked: !msg.liked } : msg
    ))
  }

  const toggleBookmark = (messageIndex: number) => {
    setMessages(prev => prev.map((msg, idx) => 
      idx === messageIndex ? { ...msg, bookmarked: !msg.bookmarked } : msg
    ))
  }

  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const deleteChat = (chatId: number) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId))
    if (activeChat === chatId) {
      setActiveChat(null)
      setMessages([{
        sender: "bot",
        text: "👋 Hello! I'm DocAI, your intelligent health assistant. What symptoms would you like to discuss?",
        timestamp: new Date(),
      }])
    }
  }

  const formatTime = (timestamp: Date) =>
    timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  const formatDate = (date: Date) => {
    const today = new Date()
    const diffTime = today.getTime() - date.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  const themeClasses = darkMode 
    ? "bg-gradient-to-br from-slate-900 to-indigo-900 text-white"
    : "bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800"

  return (
    <div className={`flex h-screen transition-all duration-300 ${themeClasses}`}>
      {/* Modern Sidebar */}
      <div className={`w-80 ${darkMode ? 'bg-slate-800/50' : 'bg-white/70'} backdrop-blur-xl border-r ${darkMode ? 'border-slate-700' : 'border-slate-200'} flex flex-col shadow-2xl`}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-200/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              💬 Chat History
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-xl ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-100 hover:bg-slate-200'} transition-colors`}
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-xl ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-100 hover:bg-slate-200'} transition-colors`}
              >
                <Settings size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {chats.length === 0 && (
            <div className="text-center py-8">
              <Archive className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm opacity-60">No conversations yet</p>
              <p className="text-xs opacity-40">Start your first chat below</p>
            </div>
          )}
          {chats.map((chat) => (
            <div key={chat.id} className="group relative">
              <button
                onClick={() => {
                  setActiveChat(chat.id)
                  setMessages(chat.history.length > 0 ? chat.history : messages)
                }}
                className={`w-full p-4 rounded-2xl text-left transition-all duration-200 ${
                  activeChat === chat.id
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-[1.02]"
                    : `${darkMode ? 'bg-slate-700/50 hover:bg-slate-700/80' : 'bg-white/60 hover:bg-white/90'} shadow-md hover:shadow-lg hover:scale-[1.01]`
                }`}
              >
                <div className="flex items-start gap-3">
                  <MessageSquare size={18} className="mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">{chat.title}</h3>
                    <p className="text-xs opacity-60 mt-1">{formatDate(chat.lastActive)}</p>
                  </div>
                </div>
              </button>
              <button
                onClick={() => deleteChat(chat.id)}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-[1.02]"
          >
            <Plus size={20} />
            <span className="font-medium">Start New Consultation</span>
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Enhanced Header */}
        <div className={`${darkMode ? 'bg-slate-800/80' : 'bg-white/80'} backdrop-blur-xl border-b ${darkMode ? 'border-slate-700' : 'border-slate-200'} p-6 shadow-sm`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <h1 className="font-bold text-xl">DocAI Assistant</h1>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isTyping ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
                  <p className="text-sm opacity-60">{isTyping ? "Analyzing symptoms..." : "Ready to help"}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className={`p-3 rounded-xl ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-100 hover:bg-slate-200'} transition-colors`}>
                <Download size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} group`}
            >
              <div className="flex flex-col max-w-2xl">
                <div
                  className={`px-6 py-4 rounded-3xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-lg ml-12"
                      : `${darkMode ? 'bg-slate-800/80' : 'bg-white/90'} backdrop-blur-md border ${darkMode ? 'border-slate-700' : 'border-slate-200'} rounded-bl-lg mr-12`
                  }`}
                >
                  {msg.typing ? (
                    <div className="flex gap-1.5 items-center py-2">
                      <div className={`w-2.5 h-2.5 ${darkMode ? 'bg-slate-400' : 'bg-slate-500'} rounded-full animate-bounce`}></div>
                      <div
                        className={`w-2.5 h-2.5 ${darkMode ? 'bg-slate-400' : 'bg-slate-500'} rounded-full animate-bounce`}
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className={`w-2.5 h-2.5 ${darkMode ? 'bg-slate-400' : 'bg-slate-500'} rounded-full animate-bounce`}
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <span className="ml-3 text-sm opacity-60">Analyzing...</span>
                    </div>
                  ) : (
                    <>
                      <p className="whitespace-pre-line text-sm leading-relaxed">{msg.text}</p>
                      {msg.medicineImage && (
                        <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200">
                          <h4 className="font-semibold text-sm text-slate-700 mb-3">💊 Recommended Medicine</h4>
                          <div className="flex items-center gap-4">
                            <img 
                              src={msg.medicineImage} 
                              alt={msg.medicineName}
                              className="w-20 h-16 object-cover rounded-xl shadow-md"
                            />
                            <div>
                              <p className="font-medium text-slate-700">{msg.medicineName}</p>
                              <p className="text-xs text-slate-500 mt-1">Over-the-counter medication</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
                
                {/* Message Actions */}
                {!msg.typing && msg.sender === "bot" && (
                  <div className="flex items-center gap-2 mt-2 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => toggleLike(idx)}
                      className={`p-2 rounded-lg ${msg.liked ? 'text-red-500' : 'text-slate-400 hover:text-red-500'} transition-colors`}
                    >
                      <Heart size={14} fill={msg.liked ? "currentColor" : "none"} />
                    </button>
                    <button
                      onClick={() => toggleBookmark(idx)}
                      className={`p-2 rounded-lg ${msg.bookmarked ? 'text-blue-500' : 'text-slate-400 hover:text-blue-500'} transition-colors`}
                    >
                      <Bookmark size={14} fill={msg.bookmarked ? "currentColor" : "none"} />
                    </button>
                    <button
                      onClick={() => copyMessage(msg.text)}
                      className="p-2 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <Copy size={14} />
                    </button>
                    <span className="text-xs text-slate-400 ml-2">{formatTime(msg.timestamp)}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Enhanced Input */}
        <div className={`p-6 ${darkMode ? 'bg-slate-800/80' : 'bg-white/80'} backdrop-blur-xl border-t ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
          <div className="flex gap-4 items-end">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe your symptoms in detail..."
                disabled={isTyping}
                className={`w-full px-6 py-4 pr-14 rounded-2xl border ${
                  darkMode 
                    ? 'bg-slate-700/80 border-slate-600 text-white placeholder-slate-400' 
                    : 'bg-slate-50/80 border-slate-200 text-slate-700 placeholder-slate-500'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 transition-all duration-200 shadow-lg`}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className={`w-6 h-6 rounded-full ${input.length > 0 ? 'bg-green-500' : 'bg-slate-300'} transition-colors`} />
              </div>
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
            >
              <Send size={18} />
              <span className="font-medium">Send</span>
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <p className="text-xs opacity-50 text-center">
              🔒 Your health information is secure • AI-powered medical assistance
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
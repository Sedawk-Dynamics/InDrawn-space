"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Minimize2, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const botResponses: { [key: string]: string } = {
  "hello": "Hi! Welcome to InDawn Space. How can I help you with your interior design needs today?",
  "hi": "Hello! I'm here to assist. Are you looking for living room, bedroom, kitchen, or full home design?",
  "services": "We offer: Living Room Design, Bedroom Interiors, Modular Kitchen, Dining Room, Home Office, Full Home Makeover, Vastu-Compliant Design, and 3D Visualization.",
  "kitchen": "Our modular kitchen designs combine style and functionality. We use premium materials and innovative layouts. Would you like to know more?",
  "bedroom": "We create serene and elegant bedroom designs tailored to your preferences. From modern to traditional, we have it all!",
  "living room": "Our living room designs balance aesthetics, comfort, and functionality for the perfect gathering space.",
  "price": "Pricing depends on the scope and materials. I recommend booking a free consultation to discuss your budget.",
  "consultation": "You can book a free consultation through our website or call +91 9326 969 679. Our team will contact you shortly.",
  "location": "We serve Dombivli, Thane, Mumbai, and Navi Mumbai. Where are you located?",
  "contact": "Call us at +91 9326 969 679 or email Info@Indawn.In. You can also visit our showroom in Dombivli.",
  "default": "That's interesting! For more specific information, I'd recommend booking a consultation or calling +91 9326 969 679.",
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm Anu Interior Designer Consultant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const findBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    for (const [key, response] of Object.entries(botResponses)) {
      if (lowerMessage.includes(key)) {
        return response
      }
    }
    return botResponses.default
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: findBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsLoading(false)
    }, 500)
  }

  if (!isOpen) {
    return (
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[var(--brand-teal)] text-white shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Open chat"
      >
        <MessageCircle className="w-7 h-7" />
      </motion.button>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`fixed z-40 bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ${
        isMinimized
          ? "bottom-6 right-6 w-72 h-16"
          : "bottom-6 right-6 w-72 sm:w-80 h-96 sm:h-[500px]"
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--brand-teal)] to-[#0f7f7a] text-white p-4 rounded-t-2xl flex items-center justify-between flex-shrink-0">
        <div className="flex-1">
          <h3 className="font-semibold text-sm">Anu Interior Designer Consultant</h3>
          <p className="text-xs text-[#a8f0ed]">Always here to help</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 hover:bg-[#0f7f7a] rounded-lg transition-colors"
          >
            {isMinimized ? (
              <Maximize2 className="w-4 h-4" />
            ) : (
              <Minimize2 className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-[#0f7f7a] rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                      msg.sender === "user"
                        ? "bg-[var(--brand-teal)] text-white rounded-br-none"
                        : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg rounded-bl-none">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ delay: i * 0.1, duration: 1, repeat: Infinity }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t bg-white rounded-b-2xl flex-shrink-0">
            <div className="flex gap-2">
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 text-sm"
              />
              <Button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                size="sm"
                className="bg-[var(--brand-teal)] hover:bg-[#0f7f7a] text-white px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </>
      )}
    </motion.div>
  )
}

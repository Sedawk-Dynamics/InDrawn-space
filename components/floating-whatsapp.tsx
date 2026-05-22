"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

export default function FloatingWhatsApp() {
  const whatsappNumber = "919326969679"
  const message = "Hi! I'm interested in InDawn Space's interior design services."
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.15, rotate: 10 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-lg hover:shadow-xl transition-shadow"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" fill="currentColor" />
    </motion.a>
  )
}

"use client"

import { motion } from "framer-motion"
import { Mail } from "lucide-react"
import { useApp } from "@/app/app-context"

export default function FloatingEnquireButton({
  onClick,
}: {
  onClick: () => void
}) {
  const { chatOpen } = useApp()

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        // Step aside while the chatbot has interaction priority.
        opacity: chatOpen ? 0 : 1,
        scale: chatOpen ? 0.6 : 1,
        pointerEvents: chatOpen ? "none" : "auto",
      }}
      transition={{ duration: 0.3 }}
      aria-hidden={chatOpen}
      className="fixed bottom-24 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[var(--brand-gold)] text-white shadow-lg hover:shadow-xl transition-shadow"
      aria-label="Open enquiry form"
    >
      <Mail className="w-7 h-7" />
    </motion.button>
  )
}

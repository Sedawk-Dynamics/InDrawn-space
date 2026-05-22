"use client"

import { motion } from "framer-motion"
import { Phone, Mail, MessageCircle } from "lucide-react"

export default function FloatingCTAButtons() {
  const whatsappNumber = "919326969679"
  const message = "Hi! I'm interested in InDawn Space's interior design services."
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
  
  // Gmail compose URL targeting Gmail only
  const gmailUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=Info@Indawn.In"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-30 flex items-center justify-center w-full px-4 pb-6"
    >
      <div className="flex items-center justify-center gap-0 bg-[var(--brand-charcoal)] rounded-full shadow-2xl overflow-hidden border border-[var(--brand-teal)]/20 backdrop-blur-sm">
        {/* Call Button */}
        <motion.a
          href="tel:+919326969679"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold text-sm hover:bg-white/5 transition-colors border-r border-white/10"
          aria-label="Call us"
        >
          <Phone className="w-5 h-5" />
          Call
        </motion.a>

        {/* Enquire Button */}
        <motion.a
          href={gmailUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold text-sm hover:bg-white/5 transition-colors border-r border-white/10"
          aria-label="Open Gmail to enquire"
        >
          <Mail className="w-5 h-5" />
          Enquire
        </motion.a>

        {/* WhatsApp Button */}
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold text-sm hover:bg-white/5 transition-colors"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5" fill="currentColor" />
          WhatsApp
        </motion.a>
      </div>
    </motion.div>
  )
}

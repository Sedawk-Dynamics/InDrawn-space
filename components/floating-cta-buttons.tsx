"use client"

import { motion } from "framer-motion"
import { Phone, Mail, MessageCircle } from "lucide-react"

export default function FloatingCTAButtons() {
  const whatsappNumber = "919326969679"

  const message =
    "Hi! I'm interested in InDawn Space's interior design services."

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`

  const gmailUrl =
    "https://mail.google.com/mail/?view=cm&fs=1&to=Info@Indawn.In"

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center w-full px-4 pb-6"
    >
      {/* Border Animation Wrapper */}
      <div className="relative rounded-full p-[2px] overflow-hidden">
        
        {/* Moving Green Border Light */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-[-100%] rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(34,197,94,0.9),transparent_30%)] blur-md"
        />

        {/* Floating animation */}
        <motion.div
          animate={{
            y: [0, -4, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative flex items-center justify-center gap-0 bg-[var(--brand-teal)] rounded-full shadow-2xl overflow-hidden border border-white/20 backdrop-blur-sm"
        >
          {/* Call Button */}
          <motion.a
            href="tel:+919326969679"
            whileHover={{
              scale: 1.08,
              y: -3,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group flex items-center justify-center gap-2 px-6 md:px-8 py-3 text-white font-semibold text-sm md:text-base hover:bg-white/10 transition-colors border-r border-white/20"
            aria-label="Call us"
          >
            <motion.div
              whileHover={{ rotate: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Phone className="w-5 h-5" />
            </motion.div>

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              Call
            </span>
          </motion.a>

          {/* Enquire Button */}
          <motion.a
            href={gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.08,
              y: -3,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group flex items-center justify-center gap-2 px-6 md:px-8 py-3 text-white font-semibold text-sm md:text-base hover:bg-white/10 transition-colors border-r border-white/20"
            aria-label="Open Gmail to enquire"
          >
            <motion.div
              whileHover={{ rotate: 8 }}
              transition={{ duration: 0.2 }}
            >
              <Mail className="w-5 h-5" />
            </motion.div>

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              Enquire
            </span>
          </motion.a>

          {/* WhatsApp Button */}
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.08,
              y: -3,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group flex items-center justify-center gap-2 px-6 md:px-8 py-3 text-white font-semibold text-sm md:text-base hover:bg-white/10 transition-colors"
            aria-label="Chat on WhatsApp"
          >
            <motion.div
              whileHover={{
                rotate: [0, -10, 10, -10, 0],
              }}
              transition={{ duration: 0.4 }}
            >
              <MessageCircle
                className="w-5 h-5"
                fill="currentColor"
              />
            </motion.div>

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              WhatsApp
            </span>
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  )
}
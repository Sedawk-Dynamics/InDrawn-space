"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Loader2, CheckCircle } from "lucide-react"
import { Input } from "@/components/ui/input"

interface EnquiryFormProps {
  isOpen: boolean
  onClose: () => void
}

export default function EnquiryForm({ isOpen, onClose }: EnquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!formData.name || !formData.phone) {
      setError("Please fill in all required fields")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/send-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          name: "",
          phone: "",
        })
        setTimeout(() => {
          onClose()
          setSubmitted(false)
        }, 2000)
      } else {
        setError(data.message || "Failed to send enquiry")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error("Form submission error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle className="w-16 h-16 text-[var(--brand-teal)] mb-4" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-[var(--brand-charcoal)] mb-2">
                      Thank you!
                    </h3>
                    <p className="text-sm text-gray-600 text-center">
                      Your enquiry has been sent successfully. We&apos;ll contact you soon.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-serif font-bold text-[var(--brand-charcoal)] mb-2">
                      Get Your Design Today
                    </h2>
                    <p className="text-gray-600 text-sm mb-6">
                      Fill out the form below and our team will contact you shortly.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Full Name *
                        </label>
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Mobile Number *
                        </label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full"
                        />
                      </div>

                      {error && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="p-3 bg-red-50 border border-red-200 rounded-lg"
                        >
                          <p className="text-sm text-red-700">{error}</p>
                        </motion.div>
                      )}

                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: loading ? 1 : 1.02 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                        className="w-full px-6 py-3 bg-[var(--brand-gold)] text-white font-semibold rounded-lg hover:bg-[var(--brand-gold-dark)] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Send Enquiry"
                        )}
                      </motion.button>

                      <p className="text-xs text-gray-500 text-center">
                        By submitting, you agree to our privacy policy.
                      </p>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

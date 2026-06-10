"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Loader2, CheckCircle, Sparkles, BadgeCheck, Wallet, ShieldCheck } from "lucide-react"
import Image from "next/image"

interface EnquiryFormProps {
  isOpen: boolean
  onClose: () => void
  /** Called once the enquiry is submitted successfully (lead captured). */
  onSuccess?: () => void
}

const countryCodes = ["+91", "+971", "+1", "+44", "+61", "+65"]

const locations = [
  "Mumbai",
  "Navi Mumbai",
  "Thane",
  "Dombivli",
  "Kalyan",
  "Other",
]

const propertyTypes = ["1 BHK", "2 BHK", "3 BHK", "4+ BHK / Duplex", "Villa"]

const promoBadges = [
  { icon: Sparkles, label: "Personalised Designs" },
  { icon: Wallet, label: "No-Cost EMI" },
  { icon: ShieldCheck, label: "25-Year Warranty" },
]

const initialForm = {
  name: "",
  email: "",
  countryCode: "+91",
  phone: "",
  location: "",
  propertyType: "",
  whatsappOptIn: true,
}

type FormState = typeof initialForm
type FormErrors = Partial<Record<keyof FormState, string>>

const fieldClass =
  "w-full h-12 px-4 rounded-xl border border-gray-200 bg-white/80 text-[15px] text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:border-[var(--brand-teal)] focus:bg-white focus:ring-4 focus:ring-[var(--brand-teal)]/10"

export default function EnquiryForm({ isOpen, onClose, onSuccess }: EnquiryFormProps) {
  const [formData, setFormData] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState("")

  const setField = (field: keyof FormState, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = (): boolean => {
    const next: FormErrors = {}

    if (!formData.propertyType) next.propertyType = "Please select a property type"
    if (!formData.location) next.location = "Please select your location"
    if (!formData.name.trim()) next.name = "Please enter your name"

    if (!formData.email.trim()) {
      next.email = "Please enter your email"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      next.email = "Please enter a valid email"
    }

    if (!formData.phone.trim()) {
      next.phone = "Please enter your mobile number"
    } else if (formData.phone.replace(/\D/g, "").length < 10) {
      next.phone = "Please enter a valid 10-digit number"
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setServerError("")

    if (!validate()) return

    setLoading(true)

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: `${formData.countryCode} ${formData.phone.trim()}`,
      location: formData.location,
      propertyType: formData.propertyType,
      whatsappOptIn: formData.whatsappOptIn,
    }

    try {
      const response = await fetch("/api/send-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitted(true)
        onSuccess?.()
        setFormData(initialForm)
        setTimeout(() => {
          onClose()
          setSubmitted(false)
        }, 2200)
      } else {
        setServerError(data.message || "Failed to send enquiry")
      }
    } catch (err) {
      setServerError("An error occurred. Please try again.")
      console.error("Form submission error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md md:max-w-3xl max-h-[92vh] overflow-hidden flex"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 p-2 rounded-full bg-white/70 hover:bg-white transition-colors z-20 shadow-sm"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            {/* ===== Left promo panel (desktop only) ===== */}
            <div className="hidden md:flex md:w-[42%] relative flex-col justify-between p-7 text-white overflow-hidden">
              <Image
                src="/images/interior-living.jpg"
                alt="Luxury interior design"
                fill
                sizes="(max-width: 768px) 0px, 320px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand-charcoal)]/40 via-[var(--brand-charcoal)]/55 to-[var(--brand-charcoal)]/85" />

              {/* Offer */}
              <div className="relative">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--brand-teal)] text-white text-[11px] font-bold uppercase tracking-wider rounded-full">
                  <Sparkles className="w-3.5 h-3.5" /> amazing Home Deals
                </span>
              </div>

              <div className="relative">
                <h3 className="font-serif text-4xl font-black leading-none drop-shadow">
                  Flat 25% OFF
                </h3>
                <p className="text-white/90 font-semibold mt-2 mb-1">
                  On Modular Interiors
                </p>
                <p className="text-[var(--brand-gold)] text-sm font-bold mb-5">
                  Limited Period Offer
                </p>

                {/* Trust badges */}
                <div className="flex flex-col gap-2.5 border-t border-white/20 pt-4">
                  {promoBadges.map((b) => {
                    const Icon = b.icon
                    return (
                      <div key={b.label} className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-[var(--brand-teal-light)]" />
                        </span>
                        <span className="text-sm font-medium text-white/90">
                          {b.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
                <p className="text-[10px] text-white/50 mt-4">
                  *T&amp;C — Valid in select cities on orders above ₹5 Lakh.
                </p>
              </div>
            </div>

            {/* ===== Right form panel ===== */}
            <div className="w-full md:w-[58%] bg-gradient-to-br from-[#fdf7ef] to-white max-h-[92vh] overflow-y-auto">
              {submitted ? (
                <div className="flex flex-col items-center justify-center px-8 py-20">
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
                    Your enquiry has been received. Our design team will contact
                    you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-7 space-y-4">
                  <div className="pr-8">
                    <h2 className="text-2xl font-serif font-bold text-[var(--brand-charcoal)] leading-tight">
                      Get a <span className="text-[var(--brand-teal)]">Free Design</span> Consultation
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                      Share a few details — our experts will reach out shortly.
                    </p>
                  </div>

                  {/* Property Type chips */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {propertyTypes.map((type) => {
                        const active = formData.propertyType === type
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setField("propertyType", type)}
                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                              active
                                ? "bg-[var(--brand-teal)] border-[var(--brand-teal)] text-white shadow-sm"
                                : "bg-white border-gray-200 text-gray-600 hover:border-[var(--brand-teal)] hover:text-[var(--brand-teal)]"
                            }`}
                          >
                            {type}
                          </button>
                        )
                      })}
                    </div>
                    {errors.propertyType && (
                      <p className="text-xs text-red-600 mt-1.5">
                        {errors.propertyType}
                      </p>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <select
                      value={formData.location}
                      onChange={(e) => setField("location", e.target.value)}
                      aria-label="Your Location / Property Address"
                      className={`${fieldClass} ${
                        formData.location ? "text-gray-800" : "text-gray-400"
                      }`}
                      aria-invalid={!!errors.location}
                    >
                      <option value="" disabled>
                        Your Location / Property Address
                      </option>
                      {locations.map((loc) => (
                        <option key={loc} value={loc} className="text-gray-800">
                          {loc}
                        </option>
                      ))}
                    </select>
                    {errors.location && (
                      <p className="text-xs text-red-600 mt-1.5">{errors.location}</p>
                    )}
                  </div>

                  {/* Name */}
                  <div>
                    <input
                      type="text"
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => setField("name", e.target.value)}
                      placeholder="Your Name"
                      className={fieldClass}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-600 mt-1.5">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => setField("email", e.target.value)}
                      placeholder="Your Email ID"
                      className={fieldClass}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-1.5">{errors.email}</p>
                    )}
                  </div>

                  {/* Mobile with country code */}
                  <div>
                    <div className="flex gap-2">
                      <select
                        value={formData.countryCode}
                        onChange={(e) => setField("countryCode", e.target.value)}
                        aria-label="Country code"
                        className="h-12 px-3 rounded-xl border border-gray-200 bg-white/80 text-[15px] text-gray-800 outline-none transition-all focus:border-[var(--brand-teal)] focus:bg-white focus:ring-4 focus:ring-[var(--brand-teal)]/10"
                      >
                        {countryCodes.map((code) => (
                          <option key={code} value={code}>
                            {code}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        value={formData.phone}
                        onChange={(e) =>
                          setField("phone", e.target.value.replace(/[^\d]/g, "").slice(0, 12))
                        }
                        placeholder="Your Mobile Number"
                        className={fieldClass}
                        aria-invalid={!!errors.phone}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-red-600 mt-1.5">{errors.phone}</p>
                    )}
                  </div>

                  {/* WhatsApp consent */}
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.whatsappOptIn}
                      onChange={(e) => setField("whatsappOptIn", e.target.checked)}
                      className="w-4 h-4 rounded accent-[var(--brand-teal)]"
                    />
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      Yes, send me updates via WhatsApp
                      <BadgeCheck className="w-4 h-4 text-[var(--brand-teal)]" />
                    </span>
                  </label>

                  {serverError && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-3 bg-red-50 border border-red-200 rounded-xl"
                    >
                      <p className="text-sm text-red-700">{serverError}</p>
                    </motion.div>
                  )}

                  {/* CTA */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.01 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="w-full px-6 py-3.5 bg-[var(--brand-gold)] text-white font-semibold rounded-xl hover:bg-[var(--brand-gold-dark)] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-[var(--brand-gold)]/20"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Book a Free Consultation"
                    )}
                  </motion.button>

                  <p className="text-xs text-gray-400 text-center">
                    By submitting, you consent to our privacy policy and terms of use.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

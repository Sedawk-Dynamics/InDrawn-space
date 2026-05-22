'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CalendarIcon, Clock, Loader2, CheckCircle } from "lucide-react"
import ReactCalendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface AppointmentCalendarProps {
  isOpen: boolean
  onClose: () => void
}

const timeSlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
]

export default function AppointmentCalendar({ isOpen, onClose }: AppointmentCalendarProps) {
  const [step, setStep] = useState<"date" | "time" | "details" | "success">("date")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setStep("time")
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setStep("details")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!formData.name || !formData.email || !formData.phone) {
      setError("Please fill in all fields")
      setLoading(false)
      return
    }

    try {
      // Simulate API call - in production, send to backend
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Here you would send the appointment to your backend
      console.log("Appointment booked:", {
        date: selectedDate,
        time: selectedTime,
        ...formData,
      })

      setStep("success")
      setTimeout(() => {
        onClose()
        // Reset form
        setStep("date")
        setSelectedDate(null)
        setSelectedTime("")
        setFormData({ name: "", email: "", phone: "" })
      }, 2000)
    } catch (err) {
      setError("Failed to book appointment. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const isDateDisabled = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today || date.getDay() === 0 || date.getDay() === 6
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
                {step === "success" ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle className="w-16 h-16 text-[var(--brand-teal)] mb-4" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-[var(--brand-charcoal)] mb-2">
                      Appointment Confirmed!
                    </h3>
                    <p className="text-sm text-gray-600 text-center">
                      We&apos;ve sent a confirmation email. See you on{" "}
                      {selectedDate?.toLocaleDateString()} at {selectedTime}
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-serif font-bold text-[var(--brand-charcoal)] mb-2">
                      Book Free Consultation
                    </h2>
                    <p className="text-gray-600 text-sm mb-6">
                      {step === "date" && "Select your preferred date"}
                      {step === "time" && "Choose a time slot"}
                      {step === "details" && "Enter your details"}
                    </p>

                    {/* Date Selection */}
                    {step === "date" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          Weekdays only (Mon-Fri)
                        </div>
                        <div className="calendar-container">
                          <ReactCalendar
                            onChange={(date) => handleDateSelect(date as Date)}
                            minDate={new Date()}
                            tileDisabled={({ date }) => isDateDisabled(date)}
                            className="w-full border-none"
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Time Selection */}
                    {step === "time" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <p className="text-sm text-gray-600 mb-4">
                          {selectedDate?.toLocaleDateString()}
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          {timeSlots.map((time) => (
                            <motion.button
                              key={time}
                              onClick={() => handleTimeSelect(time)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-3 border-2 border-gray-200 rounded-lg hover:border-[var(--brand-teal)] hover:bg-[var(--brand-teal)]/5 transition-all flex items-center justify-center gap-2"
                            >
                              <Clock className="w-4 h-4" />
                              {time}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Details Form */}
                    {step === "details" && (
                      <motion.form
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-4"
                      >
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-[var(--brand-charcoal)]">
                            {selectedDate?.toLocaleDateString()} at {selectedTime}
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Full Name *
                          </label>
                          <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your name"
                            className="w-full"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Email *
                          </label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your@email.com"
                            className="w-full"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Phone *
                          </label>
                          <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
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

                        <div className="flex gap-3">
                          <motion.button
                            type="button"
                            onClick={() => setStep("time")}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Back
                          </motion.button>
                          <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: loading ? 1 : 1.02 }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                            className="flex-1 px-4 py-2.5 bg-[var(--brand-gold)] text-white font-medium rounded-lg hover:bg-[var(--brand-gold-dark)] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            {loading ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Booking...
                              </>
                            ) : (
                              "Confirm Appointment"
                            )}
                          </motion.button>
                        </div>
                      </motion.form>
                    )}
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}

      <style jsx global>{`
        .calendar-container :global(.react-calendar) {
          font-family: inherit;
          border: none;
          border-radius: 0.5rem;
        }

        .calendar-container :global(.react-calendar__tile--active) {
          background: var(--brand-teal) !important;
          color: white;
        }

        .calendar-container :global(.react-calendar__tile:hover) {
          background: var(--brand-teal-light) !important;
        }

        .calendar-container :global(.react-calendar__tile--disabled) {
          color: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </AnimatePresence>
  )
}

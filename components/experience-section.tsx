"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock, ArrowRight, Navigation, Loader2, CheckCircle } from "lucide-react"

const centres = [
  // {
  //   city: "Mumbai",
  //   address: "Level 4, Phoenix Marketcity, Kurla West, Mumbai – 400 070",
  //   phone: "+91 9326 969 679",
  //   hours: "Mon–Sun: 10am – 8pm",
  //   highlight: true,
  // },
  // {
  //   city: "Thane",
  //   address: "Shop 12, Viviana Mall, Pokhran Road, Thane – 400 601",
  //   phone: "+91 9372 569 679",
  //   hours: "Mon–Sun: 10am – 8pm",
  //   highlight: false,
  // },
  // {
  //   city: "Navi Mumbai",
  //   address: "1st Floor, Inorbit Mall, Vashi, Navi Mumbai – 400 703",
  //   phone: "+91 9326 969 679",
  //   hours: "Mon–Sun: 10am – 8pm",
  //   highlight: false,
  // },
  {
    city: "Dombivli",
    address: "Lodha Premier Signet A, Office no 1008, Premier Colony Kalyan-Shil Road, Dombivali East Kalyan, Thane -421204",
    phone: "+91 9372 569 679",
    hours: "Mon–Sun: 10am – 8pm",
    highlight: false,
  },
]

export default function ExperienceSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    homeType: "1 BHK",
    city: "Mumbai",
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  if (!formData.name || !formData.phone || !formData.email) {
    setError("Please fill in all fields")
    setLoading(false)
    return
  }

  try {
    const response = await fetch("/api/send-enquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        serviceType: `${formData.homeType} Design Consultation`,
        message: `Requested a free consultation.
Home Type: ${formData.homeType}
City: ${formData.city}`,
      }),
    })

    if (response.ok) {
      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        homeType: "1 BHK",
        city: "Mumbai",
      })

      // Redirect to Thank You page
      window.location.assign("/thank-you")
      return
    }

    const data = await response.json()
    setError(data.message || "Failed to submit consultation request.")
  } catch (err) {
    setError("An error occurred. Please try again.")
    console.error("Consultation form error:", err)
  } finally {
    setLoading(false)
  }
}
  return (
    <section id="experience" className="py-20 lg:py-28 bg-[var(--brand-cream)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 bg-[var(--brand-teal)]/10 text-[var(--brand-teal)] text-sm font-medium rounded-full mb-4">
            Visit Us
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--brand-charcoal)] mb-4 text-balance">
            Visit Our Nearest{" "}
            <span className="text-[var(--brand-teal)]">Experience Centre</span>
          </h2>
          <p className="text-[var(--muted-foreground)] max-w-xl mx-auto leading-relaxed">
            See, touch, and feel premium materials and life-sized room mock-ups at our showrooms. Walk in or book a private viewing.
          </p>
        </motion.div>

        {/* Image + form side by side */}
        <div className="grid lg:grid-cols-2 gap-10 mb-14">
          {/* Showroom image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl h-72 sm:h-96 lg:h-full min-h-[320px]"
          >
            <Image
  src="/team.jpeg"
  alt="InDawn Space Experience Centre"
  fill
  className="object-cover object-top"
  priority
/>
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-charcoal)]/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                <p className="text-white font-semibold text-sm mb-1">FREE Site Visit + FREE Design Consultation</p>
                <p className="text-white/70 text-xs">Limited Time Offer — Book Now!</p>
              </div>
            </div>
          </motion.div>

          {/* Booking form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-[var(--brand-teal)]/10"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center h-full min-h-[300px]"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <CheckCircle className="w-16 h-16 text-[var(--brand-teal)] mb-4" />
                </motion.div>
                <h3 className="font-serif text-2xl text-[var(--brand-charcoal)] mb-2">Thank You!</h3>
                <p className="text-[var(--muted-foreground)] text-sm max-w-sm mb-6">
                  Your design consultation request has been received. Our team will reach out to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-[var(--brand-teal)] text-white text-xs font-semibold rounded-xl hover:bg-[var(--brand-teal-dark)] transition-colors"
                >
                  Book Another Consultation
                </button>
              </motion.div>
            ) : (
              <>
                <h3 className="font-serif text-2xl text-[var(--brand-charcoal)] mb-2">Book a Free Consultation</h3>
                <p className="text-[var(--muted-foreground)] text-sm mb-6">Fill in your details and we will reach out within 24 hours.</p>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-[var(--brand-charcoal)] uppercase tracking-wide">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="px-4 py-3 rounded-xl border border-[var(--brand-teal)]/20 bg-[var(--brand-cream)] text-sm focus:outline-none focus:border-[var(--brand-teal)] focus:ring-2 focus:ring-[var(--brand-teal)]/10 transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-[var(--brand-charcoal)] uppercase tracking-wide">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 XXXXX XXXXX"
                        className="px-4 py-3 rounded-xl border border-[var(--brand-teal)]/20 bg-[var(--brand-cream)] text-sm focus:outline-none focus:border-[var(--brand-teal)] focus:ring-2 focus:ring-[var(--brand-teal)]/10 transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-[var(--brand-charcoal)] uppercase tracking-wide">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="info@indawn.in"
                      className="px-4 py-3 rounded-xl border border-[var(--brand-teal)]/20 bg-[var(--brand-cream)] text-sm focus:outline-none focus:border-[var(--brand-teal)] focus:ring-2 focus:ring-[var(--brand-teal)]/10 transition-all"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-[var(--brand-charcoal)] uppercase tracking-wide">Home Type</label>
                      <select
                        name="homeType"
                        value={formData.homeType}
                        onChange={handleChange}
                        className="px-4 py-3 rounded-xl border border-[var(--brand-teal)]/20 bg-[var(--brand-cream)] text-sm focus:outline-none focus:border-[var(--brand-teal)] focus:ring-2 focus:ring-[var(--brand-teal)]/10 transition-all"
                      >
                        <option>1 BHK</option>
                        <option>2 BHK</option>
                        <option>3 BHK</option>
                        <option>4 BHK</option>
                        <option>Villa</option>
                        <option>Penthouse</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-[var(--brand-charcoal)] uppercase tracking-wide">City</label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="px-4 py-3 rounded-xl border border-[var(--brand-teal)]/20 bg-[var(--brand-cream)] text-sm focus:outline-none focus:border-[var(--brand-teal)] focus:ring-2 focus:ring-[var(--brand-teal)]/10 transition-all"
                      >
                        <option>Mumbai</option>
                        <option>Thane</option>
                        <option>Navi Mumbai</option>
                        <option>Dombivli</option>
                      </select>
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-3 bg-red-50 border border-red-200 rounded-lg text-center"
                    >
                      <p className="text-sm text-red-700">{error}</p>
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02, boxShadow: loading ? "none" : "0 8px 30px rgba(43,168,160,0.3)" }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="mt-2 py-4 bg-[var(--brand-teal)] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[var(--brand-teal-dark)] transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting Request...
                      </>
                    ) : (
                      <>
                        Book Free Consultation
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                  <p className="text-xs text-center text-[var(--muted-foreground)]">
                    By submitting, you agree to receive calls/WhatsApp from InDawn Space.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>

        {/* Centre cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {centres.map((centre, i) => (
            <motion.div
              key={centre.city}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              whileHover={{ y: -4 }}
              className={`rounded-2xl p-5 border transition-all duration-300 ${
                centre.highlight
                  ? "bg-[var(--brand-teal)] border-[var(--brand-teal)] text-white shadow-lg"
                  : "bg-white border-[var(--brand-teal)]/15 hover:border-[var(--brand-teal)]/40 hover:shadow-lg"
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <MapPin className={`w-4 h-4 ${centre.highlight ? "text-white" : "text-[var(--brand-teal)]"}`} />
                <span className={`font-semibold ${centre.highlight ? "text-white" : "text-[var(--brand-charcoal)]"}`}>
                  {centre.city}
                </span>
                {centre.highlight && (
                  <span className="ml-auto text-xs bg-[var(--brand-gold)] text-white px-2 py-0.5 rounded-full">
                    Featured
                  </span>
                )}
              </div>
              <p className={`text-xs mb-3 leading-relaxed ${centre.highlight ? "text-white/80" : "text-[var(--muted-foreground)]"}`}>
                {centre.address}
              </p>
              <div className="flex flex-col gap-1.5">
                <a
                  href={`tel:${centre.phone.replace(/\s/g, "")}`}
                  className={`flex items-center gap-1.5 text-xs ${centre.highlight ? "text-white/90 hover:text-white" : "text-[var(--brand-teal)] hover:underline"}`}
                >
                  <Phone className="w-3 h-3" />
                  {centre.phone}
                </a>
                <div className={`flex items-center gap-1.5 text-xs ${centre.highlight ? "text-white/70" : "text-[var(--muted-foreground)]"}`}>
                  <Clock className="w-3 h-3" />
                  {centre.hours}
                </div>
              </div>
              {/* <motion.button
                whileHover={{ scale: 1.02 }}
                className={`mt-4 w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                  centre.highlight
                    ? "bg-white/20 text-white hover:bg-white/30"
                    : "bg-[var(--brand-teal)]/10 text-[var(--brand-teal)] hover:bg-[var(--brand-teal)] hover:text-white"
                }`}
              >
                <Navigation className="w-3 h-3" />
                Get Directions
              </motion.button> */}
            </motion.div>
          ))}
        </motion.div>

        {/* Contact strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 bg-[var(--brand-charcoal)] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="text-white font-semibold text-lg mb-1">Call / WhatsApp Now & Book Free Consultation</p>
            <p className="text-white/50 text-sm">Our design experts are available Mon–Sun, 9am–9pm</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="tel:+919326969679"
              className="flex items-center gap-2 px-5 py-2.5 bg-[var(--brand-teal)] text-white text-sm font-semibold rounded-full hover:bg-[var(--brand-teal-dark)] transition-colors"
            >
              <Phone className="w-4 h-4" />
              +91 9326 969 679
            </a>
            <a
              href="mailto:info@indawn.in"
              className="flex items-center gap-2 px-5 py-2.5 border border-white/20 text-white text-sm font-medium rounded-full hover:bg-white/10 transition-colors"
            >
              <Mail className="w-4 h-4" />
              info@indawn.in
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

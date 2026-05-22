"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ThumbsUp, Shield, Settings, Clock, IndianRupee, Star } from "lucide-react"

const tabs = [
  {
    id: "personalised",
    label: "Personalised for You",
    icon: <ThumbsUp className="w-5 h-5" />,
    image: "/images/interior-living.jpg",
    heading: "Designs as Unique as You",
    body: "Tell our design experts what makes you tick, and we deliver to your needs. Have a minimalist sensibility? Or a love for bold textures? Our designers bring your taste to life. We create up to 20% more perceived space at a fraction of the cost of a larger home.",
    highlight: "20% More Space",
    highlightSub: "Without moving homes",
  },
  {
    id: "quality",
    label: "Quality Guaranteed",
    icon: <Shield className="w-5 h-5" />,
    image: "/images/interior-bedroom.jpg",
    heading: "Premium Materials, Lasting Quality",
    body: "Every material we use undergoes stringent quality checks. From marine-grade plywood to Italian laminates, we source only the finest raw materials from global suppliers to ensure your home stands the test of time.",
    highlight: "10-Year Warranty",
    highlightSub: "On all modular products",
  },
  {
    id: "management",
    label: "Project Management A–Z",
    icon: <Settings className="w-5 h-5" />,
    image: "/images/interior-kitchen.jpg",
    heading: "End-to-End Project Management",
    body: "From the first sketch to the final sweep, a dedicated project manager oversees every phase of your home transformation. Real-time updates, transparent timelines, and zero surprises.",
    highlight: "1 Dedicated Manager",
    highlightSub: "With you throughout",
  },
  {
    id: "emi",
    label: "Easy EMI Options",
    icon: <IndianRupee className="w-5 h-5" />,
    image: "/images/interior-dining.jpg",
    heading: "Flexible Payment Plans",
    body: "Your dream home shouldn't wait for finances. We offer zero-cost EMI options across leading banks and NBFCs, making luxury interior design accessible for every budget and every family.",
    highlight: "Zero Cost EMI",
    highlightSub: "On all packages",
  },
  {
    id: "delivery",
    label: "On-time Delivery",
    icon: <Clock className="w-5 h-5" />,
    image: "/images/interior-study.jpg",
    heading: "45-Day Delivery Promise",
    body: "We value your time. Our modular production facility and expert teams ensure your interiors are delivered and installed within 45 working days — or we compensate you for every day of delay.",
    highlight: "45-Day Delivery",
    highlightSub: "Guaranteed or compensated",
  },
]

export default function WhyUsSection() {
  const [active, setActive] = useState(tabs[0].id)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const activeTab = tabs.find((t) => t.id === active)!

  return (
    <section id="why-us" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-[var(--brand-teal)]/10 text-[var(--brand-teal)] text-sm font-medium rounded-full mb-3">
            Why InDawn Space
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--brand-charcoal)] text-balance">
            Why Choose{" "}
            <span className="text-[var(--brand-teal)]">InDawn Space</span>
          </h2>
        </motion.div>

        {/* Tab nav */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap gap-1 border-b border-[var(--brand-teal)]/10 mb-10 overflow-x-auto"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200 -mb-px ${
                active === tab.id
                  ? "border-[var(--brand-teal)] text-[var(--brand-teal)]"
                  : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--brand-charcoal)]"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-10 items-center"
          >
            {/* Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl h-72 sm:h-96 order-2 lg:order-1">
              <Image
                src={activeTab.image}
                alt={activeTab.heading}
                fill
                className="object-cover"
              />
              {/* Stat badge */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-4 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--brand-teal)]/10 flex items-center justify-center">
                  <Star className="w-6 h-6 text-[var(--brand-gold)] fill-[var(--brand-gold)]" />
                </div>
                <div>
                  <div className="font-serif text-xl font-bold text-[var(--brand-teal)]">
                    {activeTab.highlight}
                  </div>
                  <div className="text-xs text-[var(--muted-foreground)]">
                    {activeTab.highlightSub}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <h3 className="font-serif text-2xl sm:text-3xl text-[var(--brand-charcoal)] mb-4">
                {activeTab.heading}
              </h3>
              <p className="text-[var(--muted-foreground)] leading-relaxed mb-8">
                {activeTab.body}
              </p>
              <motion.a
                href="#experience"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--brand-teal)] text-white font-semibold rounded-full shadow-lg hover:bg-[var(--brand-teal-dark)] transition-colors"
              >
                Personalise Your Design
              </motion.a>

              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-4 mt-10">
                {[
                  { v: "50+", l: "Awards" },
                  { v: "4.9★", l: "Rating" },
                  { v: "98%", l: "Satisfaction" },
                ].map((s) => (
                  <div key={s.l} className="text-center p-3 bg-[var(--brand-cream)] rounded-xl">
                    <div className="font-serif text-xl font-bold text-[var(--brand-teal)]">{s.v}</div>
                    <div className="text-xs text-[var(--muted-foreground)]">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

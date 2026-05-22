"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Heart, Eye } from "lucide-react"

const categories = ["All", "Living Room", "Bedroom", "Kitchen", "Dining", "Study"]

const designs = [
  {
    id: 1,
    image: "/images/interior-living.jpg",
    title: "Contemporary Living Suite",
    category: "Living Room",
    style: "Modern",
    bhk: "3 BHK",
    location: "Mumbai",
  },
  {
    id: 2,
    image: "/images/interior-bedroom.jpg",
    title: "Serene Master Bedroom",
    category: "Bedroom",
    style: "Luxury",
    bhk: "2 BHK",
    location: "Thane",
  },
  {
    id: 3,
    image: "/images/interior-kitchen.jpg",
    title: "Premium Modular Kitchen",
    category: "Kitchen",
    style: "Contemporary",
    bhk: "3 BHK",
    location: "Navi Mumbai",
  },
  {
    id: 4,
    image: "/images/interior-dining.jpg",
    title: "Elegant Dining Space",
    category: "Dining",
    style: "Classic",
    bhk: "Villa",
    location: "Dombivli",
  },
  {
    id: 5,
    image: "/images/interior-study.jpg",
    title: "Executive Home Office",
    category: "Study",
    style: "Minimal",
    bhk: "4 BHK",
    location: "Mumbai",
  },
  {
    id: 6,
    image: "/images/hero-bg.jpg",
    title: "Grand Living Lounge",
    category: "Living Room",
    style: "Luxury",
    bhk: "Penthouse",
    location: "Mumbai",
  },
]

export default function DesignsSection() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [current, setCurrent] = useState(0)
  const [liked, setLiked] = useState<Set<number>>(new Set())
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const filtered = activeCategory === "All" ? designs : designs.filter((d) => d.category === activeCategory)
  const visibleCount = 3

  const startAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % Math.max(1, filtered.length - visibleCount + 1))
    }, 3000)
  }, [filtered.length])

  useEffect(() => {
    setCurrent(0)
    startAuto()
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [activeCategory, startAuto])

  const handlePrev = () => {
    if (autoRef.current) clearInterval(autoRef.current)
    setCurrent((prev) => (prev - 1 + Math.max(1, filtered.length - visibleCount + 1)) % Math.max(1, filtered.length - visibleCount + 1))
    startAuto()
  }

  const handleNext = () => {
    if (autoRef.current) clearInterval(autoRef.current)
    setCurrent((prev) => (prev + 1) % Math.max(1, filtered.length - visibleCount + 1))
    startAuto()
  }

  const toggleLike = (id: number) => {
    setLiked((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const visibleDesigns = filtered.slice(current, current + visibleCount)

  return (
    <section id="designs" className="py-20 lg:py-28 bg-[var(--brand-cream)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4"
        >
          <div>
            <span className="inline-block px-4 py-1.5 bg-[var(--brand-teal)]/10 text-[var(--brand-teal)] text-sm font-medium rounded-full mb-3">
              Design Gallery
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--brand-charcoal)] text-balance">
              Browse Our{" "}
              <span className="text-[var(--brand-teal)]">Popular Designs</span>
            </h2>
          </div>
          <a
            href="#experience"
            className="text-sm font-medium text-[var(--brand-teal)] hover:underline whitespace-nowrap"
          >
            View All Designs →
          </a>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[var(--brand-teal)] text-white shadow-md"
                  : "bg-white text-[var(--brand-charcoal)] hover:bg-[var(--brand-teal)]/10 border border-[var(--brand-teal)]/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleDesigns.map((design, i) => (
                <motion.div
                  key={`${design.id}-${current}`}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative h-60 sm:h-72 overflow-hidden">
                    <Image
                      src={design.image}
                      alt={design.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-charcoal)]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Hover overlay actions */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleLike(design.id)}
                        className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow"
                      >
                        <Heart
                          className={`w-4 h-4 ${liked.has(design.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                        />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </motion.button>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[var(--brand-teal)] text-white text-xs font-medium rounded-full">
                        {design.category}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="font-semibold text-[var(--brand-charcoal)] mb-2 group-hover:text-[var(--brand-teal)] transition-colors">
                      {design.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-[var(--muted-foreground)]">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-gold)]" />
                        {design.style} · {design.bhk}
                      </span>
                      <span>{design.location}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="mt-4 w-full py-2.5 border-2 border-[var(--brand-teal)] text-[var(--brand-teal)] font-semibold text-sm rounded-xl hover:bg-[var(--brand-teal)] hover:text-white transition-all duration-200"
                    >
                      Get This Design
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {/* Nav arrows */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              aria-label="Previous"
              className="w-11 h-11 rounded-full border-2 border-[var(--brand-teal)] text-[var(--brand-teal)] flex items-center justify-center hover:bg-[var(--brand-teal)] hover:text-white transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {Array.from({ length: Math.max(1, filtered.length - visibleCount + 1) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current ? "w-6 h-2 bg-[var(--brand-teal)]" : "w-2 h-2 bg-[var(--brand-teal)]/30"
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              aria-label="Next"
              className="w-11 h-11 rounded-full border-2 border-[var(--brand-teal)] text-[var(--brand-teal)] flex items-center justify-center hover:bg-[var(--brand-teal)] hover:text-white transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

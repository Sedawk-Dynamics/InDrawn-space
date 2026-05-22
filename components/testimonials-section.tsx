"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "Priya & Rohan Sharma",
    location: "3 BHK, Thane",
    rating: 5,
    text: "InDawn Space completely transformed our apartment! The 3D visualization was so accurate — what we saw on screen is exactly what we got. The team was incredibly professional and delivered 3 days ahead of schedule. Our guests can't stop complimenting the kitchen and living room!",
    tag: "Full Home Makeover",
    initials: "PR",
  },
  {
    name: "Anita Desai",
    location: "2 BHK, Navi Mumbai",
    rating: 5,
    text: "I was skeptical at first, but the team at InDawn Space blew me away. They listened to every detail of my brief and created a design that felt authentically mine. The teal and gold accents are stunning. The EMI option made it completely stress-free financially.",
    tag: "Living & Bedroom",
    initials: "AD",
  },
  {
    name: "Vikram & Sunita Mehta",
    location: "Villa, Mumbai",
    rating: 5,
    text: "We've worked with many interior designers over the years, but InDawn Space stands in a different league entirely. Their architectural background shows — the spatial planning of our villa is just exceptional. Every room flows beautifully into the next.",
    tag: "Villa Interiors",
    initials: "VS",
  },
  {
    name: "Deepak Kulkarni",
    location: "Penthouse, Dombivli",
    rating: 5,
    text: "The modular kitchen they designed for us is a masterpiece of functionality and beauty. The Italian laminate finish looks premium even after 2 years. Great post-handover support as well. Highly recommend InDawn Space for anyone who wants quality without compromise.",
    tag: "Kitchen Design",
    initials: "DK",
  },
  {
    name: "Sneha & Aakash Joshi",
    location: "3 BHK, Thane",
    rating: 5,
    text: "From the very first meeting, the InDawn Space team made us feel heard. The project manager kept us updated at every stage, and the final result exceeded our expectations. Our toddler loves the kids' room they designed — pure magic!",
    tag: "Full Home",
    initials: "SJ",
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-[var(--brand-cream)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 bg-[var(--brand-gold)]/15 text-[var(--brand-gold-dark)] text-sm font-medium rounded-full mb-4">
            Happy Customers
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--brand-charcoal)] mb-4 text-balance">
            What Our Customers{" "}
            <span className="text-[var(--brand-teal)]">Say About Us</span>
          </h2>
          <p className="text-[var(--muted-foreground)] max-w-xl mx-auto leading-relaxed">
            Over 15,000 happy families across India trust InDawn Space for their dream homes.
          </p>
        </motion.div>

        {/* Main featured testimonial */}
        <div className="max-w-4xl mx-auto mb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 relative overflow-hidden"
            >
              {/* Decorative quote icon */}
              <div className="absolute top-6 right-8 opacity-10">
                <Quote className="w-24 h-24 text-[var(--brand-teal)]" />
              </div>

              {/* Gold top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--brand-gold)] rounded-t-3xl" />

              <div className="relative z-10">
                {/* Rating */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[var(--brand-gold)] text-[var(--brand-gold)]" />
                  ))}
                </div>

                {/* Tag */}
                <span className="inline-block px-3 py-1 bg-[var(--brand-teal)]/10 text-[var(--brand-teal)] text-xs font-medium rounded-full mb-5">
                  {testimonials[current].tag}
                </span>

                {/* Text */}
                <blockquote className="font-serif text-lg sm:text-xl text-[var(--brand-charcoal)] leading-relaxed mb-8 italic">
                  &ldquo;{testimonials[current].text}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--brand-teal)] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {testimonials[current].initials}
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--brand-charcoal)]">
                      {testimonials[current].name}
                    </div>
                    <div className="text-sm text-[var(--muted-foreground)]">
                      {testimonials[current].location}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-11 h-11 rounded-full border-2 border-[var(--brand-teal)] text-[var(--brand-teal)] flex items-center justify-center hover:bg-[var(--brand-teal)] hover:text-white transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? "w-6 h-2.5 bg-[var(--brand-teal)]" : "w-2.5 h-2.5 bg-[var(--brand-teal)]/30"
                }`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={next}
            aria-label="Next testimonial"
            className="w-11 h-11 rounded-full border-2 border-[var(--brand-teal)] text-[var(--brand-teal)] flex items-center justify-center hover:bg-[var(--brand-teal)] hover:text-white transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Mini cards row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
        >
          {testimonials.map((t, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrent(i)}
              whileHover={{ y: -3 }}
              className={`p-3 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                i === current
                  ? "bg-[var(--brand-teal)] text-white shadow-lg"
                  : "bg-white hover:shadow-md"
              }`}
            >
              <div className="flex gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`w-3 h-3 ${
                      i === current ? "fill-[var(--brand-gold)] text-[var(--brand-gold)]" : "fill-[var(--brand-gold)] text-[var(--brand-gold)]"
                    }`}
                  />
                ))}
              </div>
              <div className={`text-xs font-semibold truncate ${i === current ? "text-white" : "text-[var(--brand-charcoal)]"}`}>
                {t.name.split(" ")[0]}
              </div>
              <div className={`text-xs truncate ${i === current ? "text-white/70" : "text-[var(--muted-foreground)]"}`}>
                {t.location}
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

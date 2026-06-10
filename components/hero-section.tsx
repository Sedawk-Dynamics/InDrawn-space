"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const slides = [
  {
    image: "/images/hero-bg.jpg",
    type: "amayzing",
    headline: "Flat 25% OFF*",
    subHeadline: "On Modular Interiors",
    ctaText: "Book A Free Consultation",
    ctaLink: "#experience",
    extraText: "Limited Period Offer",
    tncText: "*T&C: Valid in select cities on orders above 5 Lakh."
  },
  {
    image: "/images/interior-bedroom.jpg",
    type: "possibilities",
    headline: "51,040 Design Possibilities",
    subHeadline: "A Home Personalised For You",
    ctaText: "Speak To A Designer",
    ctaLink: "#experience",
    extraText: "No obligations | Free design estimate",
    tncText: "*T&C apply. Designs customized based on floorplans."
  },
  {
    image: "/images/interior-kitchen.jpg",
    type: "kitchen",
    headline: "Smart Modular Kitchens",
    subHeadline: "Designed Around Your Lifestyle",
    ctaText: "Get A Free Quote",
    ctaLink: "#experience",
    extraText: "10 Year Kitchen Warranty included",
    tncText: "*T&C apply. Material specifications vary by price."
  }
]

const badges = [
  {
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[var(--brand-teal)] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h12a1 1 0 001-1V10M9 21V12h6v9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15h6" />
      </svg>
    ),
    line1: "20% Extra",
    line2: "Storage"
  },
  {
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[var(--brand-teal)] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    line1: "25-Year",
    line2: "Warranty*"
  },
  {
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[var(--brand-teal)] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    line1: "No-Cost",
    line2: "EMI"
  }
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const startTimer = () => {
    stopTimer()
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 7000)
  }

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  useEffect(() => {
    startTimer()
    return () => stopTimer()
  }, [])

  const goTo = (index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent(index)
    startTimer()
    setTimeout(() => setIsAnimating(false), 600)
  }

  const nextSlide = () => {
    goTo((current + 1) % slides.length)
  }

  const prevSlide = () => {
    goTo((current - 1 + slides.length) % slides.length)
  }

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-white mt-20 border-b border-gray-100">
      {/* Main Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 w-full lg:h-[75vh] min-h-[450px] lg:min-h-[420px]">
        {/* Left Side: Images & Floating Card */}
        <div className="relative lg:col-span-7 xl:col-span-8 h-[30vh] sm:h-[40vh] lg:h-full w-full overflow-hidden bg-gray-50">
          <AnimatePresence mode="sync">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={slides[current].image}
                alt={slides[current].headline}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Floating trust badges banner */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-lg md:max-w-xl bg-white/95 backdrop-blur shadow-[0_10px_30px_rgba(0,0,0,0.08)] rounded-2xl p-3 md:p-4 border border-white/60 z-20 flex items-center justify-between gap-1 md:gap-4">
            {badges.map((badge, idx) => (
              <div key={idx} className="flex-1 flex items-center justify-center gap-2 sm:gap-3 px-1 sm:px-2">
                {badge.icon}
                <div className="text-[10px] sm:text-xs md:text-sm text-gray-800 leading-tight">
                  <span className="block font-extrabold whitespace-nowrap">{badge.line1}</span>
                  <span className="block text-gray-600 font-semibold whitespace-nowrap">{badge.line2}</span>
                </div>
                {idx < badges.length - 1 && (
                  <div className="h-8 w-[1px] bg-gray-200 ml-2 md:ml-4 self-center shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* T&C text */}
          <div className="absolute bottom-2 left-4 z-20 hidden md:block">
            <p className="text-[10px] text-white/90 drop-shadow-md font-semibold select-none bg-black/20 px-2.5 py-1 rounded-md backdrop-blur-[2px]">
              {slides[current].tncText}
            </p>
          </div>
        </div>

        {/* Right Side: Text & CTA */}
        <div className="relative lg:col-span-5 xl:col-span-4 flex flex-col justify-center items-center text-center bg-[#FAF9F5] p-8 sm:p-12 lg:p-8 xl:p-12 w-full h-full z-10 border-t lg:border-t-0 lg:border-l border-gray-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center max-w-sm w-full"
            >
              {/* Top Branding / Offer Badge */}
              {slides[current].type === "amayzing" && (
                <div className="relative inline-flex flex-col items-center select-none mb-6">
                  {/* Floating decorative golden coins */}
                  <span className="absolute -top-3 -right-4 w-4 h-4 bg-yellow-400 rounded-full border border-yellow-300 shadow-sm animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="absolute top-8 -left-5 w-3 h-3 bg-yellow-400 rounded-full border border-yellow-300 shadow-sm animate-pulse" />
                  <span className="absolute -bottom-1 right-8 w-2 h-2 bg-yellow-400 rounded-full border border-yellow-300 shadow-sm" />

                  <div className="flex items-baseline gap-1">
                    <span className="text-[var(--brand-teal)] text-4xl font-black tracking-tighter lowercase">amazing</span>
                  </div>
                  
                  <div className="mt-1 px-4 py-1 bg-[var(--brand-teal)] text-white text-[11px] font-black tracking-widest uppercase rounded shadow-sm relative">
                    Home Deals
                    <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[var(--brand-teal)] rotate-45" />
                  </div>
                </div>
              )}

              {slides[current].type === "possibilities" && (
                <div className="relative inline-flex flex-col items-center select-none mb-6">
                  <div className="px-4 py-1.5 bg-[var(--brand-teal)]/10 border border-[var(--brand-teal)]/30 rounded-full text-[var(--brand-teal)] text-xs font-bold uppercase tracking-widest shadow-sm">
                    Personalized Designs
                  </div>
                </div>
              )}

              {slides[current].type === "kitchen" && (
                <div className="relative inline-flex flex-col items-center select-none mb-6">
                  <div className="px-4 py-1.5 bg-[var(--brand-teal)]/10 border border-[var(--brand-teal)]/30 rounded-full text-[var(--brand-teal)] text-xs font-bold uppercase tracking-widest shadow-sm">
                    Smart Kitchens
                  </div>
                </div>
              )}

              {/* Headline */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-black text-gray-900 leading-tight mb-2 text-balance">
                {slides[current].headline}
              </h1>

              {/* Subheadline with premium dashes */}
              <div className="flex items-center justify-center gap-3 my-4 text-[var(--brand-gold)] font-bold text-sm sm:text-base uppercase tracking-wider w-full">
                <span className="w-8 h-[1.5px] bg-[var(--brand-gold)]/40" />
                <span className="text-center leading-none">{slides[current].subHeadline}</span>
                <span className="w-8 h-[1.5px] bg-[var(--brand-gold)]/40" />
              </div>

              {/* CTA Button with clicky premium hover effect */}
              <motion.a
                href={slides[current].ctaLink}
                whileHover={{ y: 2 }}
                whileTap={{ y: 4 }}
                className="mt-6 inline-block w-full sm:w-auto px-8 py-4 bg-[var(--brand-gold)] text-white text-base font-extrabold uppercase tracking-wide rounded-xl select-none shadow-[0_4px_0_#5f5001,0_10px_20px_rgba(120,100,1,0.25)] active:shadow-none hover:shadow-[0_2px_0_#5f5001,0_6px_12px_rgba(120,100,1,0.2)] text-center cursor-pointer transition-all duration-150"
              >
                {slides[current].ctaText}
              </motion.a>

              {/* Extra Offer ends/subtext */}
              <p className="mt-6 text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">
                {slides[current].extraText}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators inside the content text area */}
          <div className="absolute bottom-6 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-6 bg-[var(--brand-gold)]" : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows at outer edges */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 sm:w-10 h-16 bg-gray-900/10 hover:bg-gray-900/35 backdrop-blur-[2px] flex items-center justify-center text-gray-800 hover:text-white transition-all rounded-r-lg"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 sm:w-10 h-16 bg-gray-900/10 hover:bg-gray-900/35 backdrop-blur-[2px] flex items-center justify-center text-gray-800 hover:text-white transition-all rounded-l-lg"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Mobile-only T&C text */}
      <div className="block md:hidden text-center py-2 bg-gray-50 border-t border-gray-100">
        <p className="text-[9px] text-gray-500 font-medium">
          {slides[current].tncText}
        </p>
      </div>

      {/* Progress bar at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gray-200/50 z-20">
        <motion.div
          key={current}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 7, ease: "linear" }}
          className="h-full bg-[var(--brand-gold)]"
        />
      </div>
    </section>
  )
}

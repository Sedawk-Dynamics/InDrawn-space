"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { CheckCircle, Ruler, Palette, Truck } from "lucide-react"

const steps = [
  {
    icon: <CheckCircle className="w-7 h-7" />,
    title: "Book Free Consultation",
    desc: "Share your vision, budget, and preferences with our expert designers in a no-obligation session.",
    color: "bg-[var(--brand-teal)]",
  },
  {
    icon: <Palette className="w-7 h-7" />,
    title: "3D Design & Approval",
    desc: "Get a photo-realistic 3D walkthrough of your home before a single nail is hammered.",
    color: "bg-[var(--brand-gold)]",
  },
  {
    icon: <Ruler className="w-7 h-7" />,
    title: "On-site Execution",
    desc: "Our experienced team of craftsmen execute every detail with precision and quality materials.",
    color: "bg-[var(--brand-teal-dark)]",
  },
  {
    icon: <Truck className="w-7 h-7" />,
    title: "Hassle-free Handover",
    desc: "Move into your dream home on schedule — clean, complete, and ready to live in.",
    color: "bg-[var(--brand-charcoal)]",
  },
]

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export default function EasySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="easy" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-[var(--brand-teal)]/10 text-[var(--brand-teal)] text-sm font-medium rounded-full mb-4">
            Simple Process
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--brand-charcoal)] mb-4 text-balance">
            Home Interiors{" "}
            <span className="text-[var(--brand-teal)]">Made Easy</span>
          </h2>
          <p className="text-[var(--muted-foreground)] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            From consultation to keys — our streamlined 4-step process ensures your home transformation is smooth, transparent, and stress-free.
          </p>
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image stack */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-80 sm:h-96 lg:h-[500px]">
              <Image
                src="/images/interior-living.jpg"
                alt="Home interiors made easy"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-charcoal)]/40 to-transparent" />
            </div>

            {/* Floating card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -right-8 z-20"
            >
              {/* Soft Glow */}
              <div className="absolute inset-0 rounded-3xl bg-[var(--brand-teal)]/20 blur-2xl opacity-60" />

              {/* Card */}
              <div className="relative bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.18)] px-6 py-5 flex items-center gap-4 border border-[var(--brand-teal)]/10">

                {/* Top Tag */}
                <div className="absolute -top-3 left-4 bg-[var(--brand-teal)] text-white text-[10px] font-semibold px-3 py-1 rounded-full tracking-wide shadow">
                  GUARANTEED
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[var(--brand-teal)] text-white flex items-center justify-center shadow-md">
                  <CheckCircle className="w-6 h-6" />
                </div>

                {/* Content */}
                <div>
                  <div className="font-serif text-2xl font-bold text-[var(--brand-charcoal)] leading-tight">
                    45 Days Delivery* 
                  </div>
                  <div className="text-sm text-[var(--muted-foreground)]">
Terms & Conditions Apply <br />
    Guaranteed On-Time Completion
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Second floating card */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -top-6 -left-6 bg-[var(--brand-gold)] rounded-2xl shadow-xl p-4 text-white hidden sm:flex items-center gap-3"
            >
              <span className="font-serif text-xl font-bold">Free</span>
              <span className="text-sm font-medium opacity-90">3D Design &<br />Quotation*</span>
            </motion.div>
          </motion.div>

          {/* Right: Steps */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="flex flex-col gap-6"
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={itemVariants}
                whileHover={{ x: 6, transition: { duration: 0.2 } }}
                className="flex items-start gap-5 p-5 rounded-2xl bg-[var(--brand-cream)] border border-transparent hover:border-[var(--brand-teal)]/20 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <div className={`${step.color} text-white w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-[var(--brand-teal)] uppercase tracking-widest">
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[var(--brand-charcoal)] mb-1">{step.title}</h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

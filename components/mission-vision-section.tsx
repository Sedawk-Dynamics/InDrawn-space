"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Target, Eye, CheckCircle2 } from "lucide-react"

const pillars = [
  {
    icon: Target,
    title: "Our Mission",
    accent: "text-[var(--brand-teal)]",
    iconBg: "bg-[var(--brand-teal)]/15",
    text: "To bring architectural thinking to every home — transforming spaces into thoughtfully designed living experiences that balance beauty, function, and the way real families live.",
    points: [
      "Design-first, detail-obsessed process",
      "Honest pricing with no hidden surprises",
      "On-time delivery, every single project",
    ],
  },
  {
    icon: Eye,
    title: "Our Vision",
    accent: "text-[var(--brand-gold)]",
    iconBg: "bg-[var(--brand-gold)]/15",
    text: "To become India's most trusted interior design partner — where world-class design is accessible to every home, from the smallest 1 BHK to sprawling penthouses.",
    points: [
      "Setting the benchmark for residential design",
      "Building lifelong relationships, not one-off jobs",
      "Growing across India, one happy home at a time",
    ],
  },
]

export default function MissionVisionSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      id="mission-vision"
      className="relative bg-[var(--brand-charcoal)] text-white overflow-hidden py-20 lg:py-28"
    >
      {/* Decorative background — matches footer/stats charcoal pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[var(--brand-teal)]/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[var(--brand-gold)]/10 blur-3xl" />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 bg-[var(--brand-gold)]/20 text-[var(--brand-gold)] text-sm font-medium rounded-full mb-4">
            Who We Are
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-4 text-balance">
            Our Mission &amp;{" "}
            <span className="text-[var(--brand-teal)]">Vision</span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Founded by architects, driven by design excellence — here is the
            purpose that guides every home we craft.
          </p>
        </motion.div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Founder image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/5] sm:aspect-[3/4]">
              <Image
                src="/founder.jpeg"
                alt="InDawn Space founders — Architects"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-charcoal)] via-[var(--brand-charcoal)]/20 to-transparent" />

              {/* Quote overlay — footer-style glass card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5">
                <p className="text-white font-serif text-base italic leading-relaxed">
                  &ldquo;We didn&apos;t just want to decorate homes. We wanted to
                  design lives.&rdquo;
                </p>
                <p className="text-[var(--brand-gold)] text-sm font-medium mt-2">
                  — Co-Founders, InDawn Space
                </p>
              </div>
            </div>
          </motion.div>

          {/* Mission + Vision cards */}
          <div className="flex flex-col gap-6">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-7 hover:border-[var(--brand-teal)]/40 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center ${pillar.iconBg}`}
                    >
                      <Icon className={`w-6 h-6 ${pillar.accent}`} />
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-white">
                      {pillar.title}
                    </h3>
                  </div>

                  <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-4">
                    {pillar.text}
                  </p>

                  <ul className="flex flex-col gap-2.5">
                    {pillar.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-white/70 text-sm"
                      >
                        <CheckCircle2
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${pillar.accent}`}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Gold accent line — same divider used in the footer */}
      <div className="relative h-0.5 bg-[var(--brand-gold)]/30 mx-4 sm:mx-6 lg:mx-8 rounded-full mt-16" />
    </section>
  )
}

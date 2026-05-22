"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Instagram, Linkedin, ArrowUpRight } from "lucide-react"

const designers = [

  {
    name: "Mr. Binod Prakash",
    role: "Founder | Director | CEO",
    speciality: "Contemporary & Modern",
    projects: "480+",
    image: "/images/Binod.jpeg",
    rating: "5.0",
  },
  {
    name: "Mrs. Anuprity Prakash",
    role: "Co-Founder | Director | Interior Designer",
    speciality: "Luxury Residential",
    projects: "340+",
    image: "/images/Anuprity.jpeg",
    rating: "4.9",
  },
  {
    name: "Rajesh Mourya",
    role: "Vice President, BDM, CMO",
    speciality: "Minimalist & Scandinavian",
    projects: "195+",
    image: "/images/Rajesh.jpeg",
    rating: "4.9",
  },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export default function DesignersSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="designers" className="py-20 lg:py-28 bg-[var(--brand-charcoal)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
        >
          <div>
            <span className="inline-block px-4 py-1.5 bg-[var(--brand-teal)]/20 text-[var(--brand-teal-light)] text-sm font-medium rounded-full mb-3">
              The Creative Team
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white text-balance">
              Meet Our{" "}
              <span className="text-[var(--brand-teal)]">Expert Designers</span>
            </h2>
          </div>
          <p className="text-white/50 max-w-xs text-sm leading-relaxed">
            20+ certified designers with an average of 8 years of experience crafting dream interiors.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {designers.map((d) => (
            <motion.div
              key={d.name}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-[var(--brand-teal)]/50 transition-all duration-400 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-72 sm:h-80 overflow-hidden">
                <Image
                  src={d.image}
                  alt={d.name}
                  fill
                  className="object-cover object-top group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-charcoal)] via-[var(--brand-charcoal)]/20 to-transparent" />

                {/* Social icons overlay */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[var(--brand-teal)] transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[var(--brand-teal)] transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-white text-lg">{d.name}</h3>
                    <p className="text-[var(--brand-teal-light)] text-sm">{d.role}</p>
                    <p className="text-white/50 text-xs mt-0.5">{d.speciality}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 45 }}
                    className="w-8 h-8 rounded-full bg-[var(--brand-teal)] flex items-center justify-center flex-shrink-0 mt-1"
                  >
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </motion.button>
                </div>

                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/10">
                  <div className="text-center">
                    <div className="font-bold text-[var(--brand-gold)] text-sm">{d.projects}</div>
                    <div className="text-white/40 text-xs">Projects</div>
                  </div>
                  <div className="w-px h-6 bg-white/10" />
                  <div className="text-center">
                    <div className="font-bold text-[var(--brand-gold)] text-sm">★ {d.rating}</div>
                    <div className="text-white/40 text-xs">Rating</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* See all */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-10"
        >
          <motion.a
            href="#experience"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-[var(--brand-teal)] text-[var(--brand-teal)] font-semibold rounded-full hover:bg-[var(--brand-teal)] hover:text-white transition-all duration-200"
          >
            Meet All 200+ Designers
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

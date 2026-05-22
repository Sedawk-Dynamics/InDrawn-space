"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Clock, ArrowRight, BookOpen } from "lucide-react"

const guides = [
  {
    image: "/images/guide-1.jpg",
    category: "Design Basics",
    title: "How to Choose the Perfect Color Palette for Your Home",
    excerpt:
      "Color sets the emotional tone of every space. Learn how professional designers pick harmonious palettes that work across lighting conditions and room sizes.",
    readTime: "5 min read",
    date: "Apr 2026",
  },
  {
    image: "/images/guide-2.jpg",
    category: "Kitchen Design",
    title: "The Complete Guide to Modular Kitchen Layouts",
    excerpt:
      "From L-shaped to U-shaped and parallel kitchens — discover which layout maximizes efficiency, storage, and style for your home.",
    readTime: "7 min read",
    date: "Mar 2026",
  },
  {
    image: "/images/guide-3.jpg",
    category: "Lighting",
    title: "Lighting Design 101: Transform Any Room with Light",
    excerpt:
      "Learn the three-layer lighting system that interior designers use to create depth, warmth, and functionality in every room of your home.",
    readTime: "6 min read",
    date: "Mar 2026",
  },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export default function GuidesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="guides" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
        >
          <div>
            <span className="inline-block px-4 py-1.5 bg-[var(--brand-teal)]/10 text-[var(--brand-teal)] text-sm font-medium rounded-full mb-3">
              Knowledge Hub
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--brand-charcoal)] text-balance">
              Guides for{" "}
              <span className="text-[var(--brand-teal)]">Home Interiors</span>
            </h2>
          </div>
          <a
            href="#"
            className="flex items-center gap-1.5 text-sm font-medium text-[var(--brand-teal)] hover:underline whitespace-nowrap"
          >
            <BookOpen className="w-4 h-4" />
            Browse All Articles
          </a>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {guides.map((guide, i) => (
            <motion.article
              key={guide.title}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-2xl overflow-hidden border border-[var(--brand-teal)]/10 shadow-sm hover:shadow-xl transition-all duration-400 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-52 overflow-hidden">
                <Image
                  src={guide.image}
                  alt={guide.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Category tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[var(--brand-teal)] text-white text-xs font-medium rounded-full">
                    {guide.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)] mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {guide.readTime}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[var(--muted-foreground)]" />
                  <span>{guide.date}</span>
                </div>

                <h3 className="font-semibold text-[var(--brand-charcoal)] mb-2 leading-snug group-hover:text-[var(--brand-teal)] transition-colors">
                  {guide.title}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4 line-clamp-3">
                  {guide.excerpt}
                </p>

                <div className="flex items-center gap-1.5 text-sm font-medium text-[var(--brand-teal)] group-hover:gap-2.5 transition-all duration-200">
                  Read Article
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

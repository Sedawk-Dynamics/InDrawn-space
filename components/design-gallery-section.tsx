"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Filter } from "lucide-react"

interface Design {
  id: number
  title: string
  category: string
  image: string
  area: string
  style: string
  description: string
}

const designs: Design[] = [
  {
    id: 1,
    title: "Modern Living Room with Wall Art",
    category: "Living Room",
    image: "/images/interior-living.jpg",
    area: "400 Sq Ft",
    style: "Modern",
    description: "A contemporary living room featuring sleek furniture and accent lighting.",
  },
  {
    id: 2,
    title: "Luxurious Master Bedroom",
    category: "Bedroom",
    image: "/images/interior-bedroom.jpg",
    area: "250 Sq Ft",
    style: "Luxury",
    description: "An elegant bedroom with premium finishes and ambient lighting.",
  },
  {
    id: 3,
    title: "Modular Kitchen Design",
    category: "Kitchen",
    image: "/images/interior-kitchen.jpg",
    area: "120 Sq Ft",
    style: "Contemporary",
    description: "Functional and stylish kitchen with smart storage solutions.",
  },
  {
    id: 4,
    title: "Stylish Dining Space",
    category: "Dining",
    image: "/images/interior-dining.jpg",
    area: "200 Sq Ft",
    style: "Minimalist",
    description: "A dining area designed for both elegance and functionality.",
  },
  {
    id: 5,
    title: "Home Office Setup",
    category: "Home Office",
    image: "/images/interior-study.jpg",
    area: "150 Sq Ft",
    style: "Scandinavian",
    description: "A productive workspace with natural light and ergonomic design.",
  },
]

const categories = ["All", "Living Room", "Bedroom", "Kitchen", "Dining", "Home Office"]

export default function DesignGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredDesigns =
    selectedCategory === "All"
      ? designs
      : designs.filter((d) => d.category === selectedCategory)

  return (
    <section id="design-gallery" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--brand-teal)]/10 border border-[var(--brand-teal)]/20 text-[var(--brand-teal)] text-sm font-medium rounded-full mb-4">
            <Filter className="w-3.5 h-3.5" />
            Design Gallery
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--brand-charcoal)] mb-4 text-balance">
            Browse Our Popular Designs
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our collection of stunning interior designs crafted for different spaces and styles.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-[var(--brand-teal)] text-white shadow-lg"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-[var(--brand-teal)]"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {filteredDesigns.map((design, idx) => (
            <motion.div
              key={design.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <Image
                  src={design.image}
                  alt={design.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className="px-3 py-1 bg-[var(--brand-teal)]/10 text-[var(--brand-teal)] text-xs font-semibold rounded-full">
                    {design.category}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">{design.area}</span>
                </div>
                <h3 className="font-semibold text-[var(--brand-charcoal)] mb-2 line-clamp-2">
                  {design.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {design.description}
                </p>
                <Link
                  href={`/design/${design.id}`}
                  className="flex items-center gap-2 text-[var(--brand-teal)] font-medium text-sm hover:gap-3 transition-all"
                >
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-serif font-bold text-[var(--brand-charcoal)] mb-4">
            Want to see more designs?
          </h3>
          <p className="text-gray-600 mb-6">
            Explore our full portfolio and find inspiration for your dream home.
          </p>
          <motion.a
            href="#experience"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--brand-gold)] text-white font-semibold rounded-full hover:bg-[var(--brand-gold-dark)] transition-colors shadow-lg"
          >
            Book Free Consultation
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

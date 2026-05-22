"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const partners = [
  { name: "IKEA", category: "Furniture" },
  { name: "Bosch", category: "Appliances" },
  { name: "Kohler", category: "Sanitaryware" },
  { name: "Hettich", category: "Hardware" },
  { name: "Asian Paints", category: "Paints" },
  { name: "Hafele", category: "Fittings" },
  { name: "Grohe", category: "Fixtures" },
  { name: "EGGER", category: "Laminates" },
  { name: "Sleek", category: "Modular" },
  { name: "Godrej", category: "Furniture" },
  { name: "Duravit", category: "Sanitaryware" },
  { name: "Fevicryl", category: "Materials" },
]

function PartnerCard({ name, category }: { name: string; category: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      className="flex-shrink-0 w-36 sm:w-44 mx-3 bg-white rounded-xl border border-[var(--brand-teal)]/10 px-5 py-4 flex flex-col items-center justify-center gap-1 shadow-sm hover:shadow-md hover:border-[var(--brand-teal)]/30 transition-all duration-300 cursor-pointer group"
    >
      {/* Logo placeholder with teal icon */}
      <div className="w-10 h-10 rounded-full bg-[var(--brand-teal)]/10 flex items-center justify-center mb-1 group-hover:bg-[var(--brand-teal)]/20 transition-colors">
        <span className="font-bold text-[var(--brand-teal)] text-sm">{name[0]}</span>
      </div>
      <div className="font-semibold text-[var(--brand-charcoal)] text-sm text-center">{name}</div>
      <div className="text-[var(--muted-foreground)] text-xs">{category}</div>
    </motion.div>
  )
}

export default function PartnersSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const doubled = [...partners, ...partners]

  return (
    <section id="partners" className="py-16 lg:py-24 bg-white overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="inline-block px-4 py-1.5 bg-[var(--brand-teal)]/10 text-[var(--brand-teal)] text-sm font-medium rounded-full mb-4">
            Trusted Globally
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--brand-charcoal)] mb-4 text-balance">
            Our Trusted{" "}
            <span className="text-[var(--brand-teal)]">Global Partners</span>
          </h2>
          <p className="text-[var(--muted-foreground)] max-w-xl mx-auto leading-relaxed">
            We source materials and products exclusively from world-renowned brands — guaranteeing quality, durability, and international standards for your home.
          </p>
        </motion.div>
      </div>

      {/* Infinite scroll row 1 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-4 overflow-hidden"
      >
        <div className="flex animate-scroll-left">
          {doubled.map((p, i) => (
            <PartnerCard key={`r1-${i}`} name={p.name} category={p.category} />
          ))}
        </div>
      </motion.div>

      {/* Infinite scroll row 2 (reversed) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="overflow-hidden"
        style={{ direction: "rtl" }}
      >
        <div className="flex animate-scroll-left" style={{ direction: "ltr" }}>
          {doubled.map((p, i) => (
            <PartnerCard key={`r2-${i}`} name={p.name} category={p.category} />
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-10"
      >
        <p className="text-[var(--muted-foreground)] text-sm">
          All materials come with manufacturer warranties and are QC-certified by our team.
        </p>
      </motion.div>
    </section>
  )
}

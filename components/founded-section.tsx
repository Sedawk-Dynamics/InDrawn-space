"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Award, Ruler, Users, ArrowRight } from "lucide-react"

const milestones = [
  { year: "2014", event: "InDawn Space founded by two IIT-trained architects in Mumbai" },
  { year: "2016", event: "Launched our first Experience Centre in Thane" },
  { year: "2018", event: "Crossed 1,000 home interiors delivered" },
  { year: "2020", event: "Expanded to Navi Mumbai and Dombivli" },
  { year: "2023", event: "10,000+ homes milestone; 50+ design awards received" },
  { year: "2026", event: "88+ homes delivered across 4 cities with 200+ designers" },
]

const values = [
  {
    icon: <Ruler className="w-6 h-6" />,
    title: "Architectural Precision",
    desc: "Every design is engineered with structural integrity and spatial science — not just aesthetics.",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Award-Winning Innovation",
    desc: "50+ national and international design awards recognizing our commitment to excellence.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Human-Centred Design",
    desc: "We design for the people who will live in the space, prioritizing function and feeling equally.",
  },
]

export default function FoundedSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="founded" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-[var(--brand-gold)]/15 text-[var(--brand-gold-dark)] text-sm font-medium rounded-full mb-4">
            Our Story
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--brand-charcoal)] mb-4 text-balance">
            Founded By{" "}
            <span className="text-[var(--brand-teal)]">Architects</span>
          </h2>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed">
            InDawn Space was born from a simple belief: that every home deserves the same level of thoughtful design that goes into the world&apos;s greatest buildings.
          </p>
        </motion.div>

        {/* Story content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Founders image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] sm:aspect-[3/4]">
              <Image
                src="/founder.jpeg"
                alt="InDawn Space founders — Architects"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-charcoal)]/50 to-transparent" />

              {/* Quote overlay */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5">
                <p className="text-white font-serif text-base italic leading-relaxed">
                  &ldquo;We didn&apos;t just want to decorate homes. We wanted to design lives.&rdquo;
                </p>
                <p className="text-[var(--brand-gold)] text-sm font-medium mt-2">
                  — Co-Founders, InDawn Space
                </p>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-5 -right-5 bg-[var(--brand-gold)] text-white rounded-2xl p-4 shadow-xl text-center hidden sm:block"
            >
              <div className="font-serif text-3xl font-bold">10+</div>
              <div className="text-xs font-medium mt-0.5">Years<br />of Excellence</div>
            </motion.div>
          </motion.div>

          {/* Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-5">
              In 2014, two architects from Mumbai — trained at some of India&apos;s leading institutions and having worked on landmark commercial projects — realized that the same discipline and rigour applied to grand architecture was almost never applied to residential interiors.
            </p>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-8">
              They founded <strong className="text-[var(--brand-teal)]">InDawn Space</strong> with a mission to bring architectural thinking to every home — from the smallest 1 BHK to sprawling penthouses. Today, with over 200 designers and 88+ completed homes, InDawn Space remains true to that founding principle: <em>living meets luxury.</em>
            </p>

            {/* Values */}
            <div className="flex flex-col gap-4 mb-8">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-[var(--brand-cream)] hover:shadow-md transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--brand-teal)]/10 flex items-center justify-center text-[var(--brand-teal)] flex-shrink-0">
                    {v.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--brand-charcoal)] mb-0.5">{v.title}</h4>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#experience"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--brand-teal)] text-white font-semibold rounded-full shadow-lg hover:bg-[var(--brand-teal-dark)] transition-colors"
            >
              Our Full Story
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h3 className="font-serif text-2xl text-[var(--brand-charcoal)] text-center mb-8">
            Our Journey
          </h3>
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-[var(--brand-teal)]/20 hidden md:block" />

            <div className="flex flex-col gap-6">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                  className={`flex items-center gap-4 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10"}`}>
                    <div className="inline-flex items-center gap-3 bg-white border border-[var(--brand-teal)]/15 rounded-2xl px-5 py-3 shadow-sm hover:shadow-md hover:border-[var(--brand-teal)]/30 transition-all duration-200">
                      <span className="font-serif font-bold text-[var(--brand-teal)] text-lg">{m.year}</span>
                      <span className="text-sm text-[var(--muted-foreground)]">{m.event}</span>
                    </div>
                  </div>
                  {/* Dot */}
                  <div className="w-4 h-4 rounded-full bg-[var(--brand-teal)] border-4 border-white shadow-md flex-shrink-0 hidden md:block" />
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

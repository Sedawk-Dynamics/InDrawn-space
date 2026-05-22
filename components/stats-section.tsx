"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Home, Users, Award, MapPin } from "lucide-react"

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return

    let start = 0
    const increment = target / (duration * 60)

    const timer = setInterval(() => {
      start += increment

      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)

    return () => clearInterval(timer)
  }, [active, target, duration])

  return count
}

const stats = [
  {
    icon: Home,
    value: 88,
    suffix: "+",
    label: "Dream Homes",
    color: "text-[var(--brand-teal)]",
  },
  {
    icon: Users,
    value: 20,
    suffix: "+",
    label: "Expert Designers",
    color: "text-[var(--brand-gold)]",
  },
  {
    icon: Award,
    value: 50,
    suffix: "+",
    label: "Design Awards",
    color: "text-[var(--brand-teal)]",
  },
  {
    icon: MapPin,
    value: 4,
    suffix: " Cities",
    label: "Across India",
    color: "text-[var(--brand-gold)]",
  },
]

const cities = ["Mumbai", "Thane", "Navi Mumbai", "Dombivli"]

const photoGrid = [
  {
    src: "/images/interior-living.jpg",
    alt: "Luxury living room",
  },
  {
    src: "/images/interior-bedroom.jpg",
    alt: "Bedroom design",
  },
  {
    src: "/images/interior-kitchen.jpg",
    alt: "Modular kitchen",
  },
  {
    src: "/images/interior-dining.jpg",
    alt: "Dining room",
  },
  {
    src: "/images/interior-study.jpg",
    alt: "Study room",
  },
]

export default function StatsSection() {
  const ref = useRef(null)

  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  })

  // Dynamic counters based on stats values
  const counts = [
    useCountUp(stats[0].value, 2, inView),
    useCountUp(stats[1].value, 1.5, inView),
    useCountUp(stats[2].value, 1.5, inView),
    useCountUp(stats[3].value, 1, inView),
  ]

  return (
    <section
      id="stats"
      className="py-20 lg:py-28 bg-[var(--brand-charcoal)] overflow-hidden relative"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[var(--brand-teal)]/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[var(--brand-gold)]/10 blur-3xl" />
      </div>

      <div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        ref={ref}
      >
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-[var(--brand-gold)]/20 text-[var(--brand-gold)] text-sm font-medium rounded-full mb-4">
            Our Impact
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-4 text-balance">
            88+ Dream Homes Delivered{" "}
            <span className="text-[var(--brand-teal)]">
              Across India
            </span>
          </h2>

          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            From compact 1 BHK apartments to sprawling penthouses,
            we have transformed 88+ homes with award-winning
            design expertise.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => {
            const Icon = stat.icon

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.2 },
                }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:border-[var(--brand-teal)]/40 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-3">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>

                <div
                  className={`font-serif text-3xl sm:text-4xl font-bold ${stat.color} mb-1`}
                >
                  {counts[i].toLocaleString()}
                  {stat.suffix}
                </div>

                <div className="text-white/60 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-3 grid-rows-2 gap-3 h-[400px] sm:h-[480px] mb-12">
          {photoGrid.map((photo, i) => (
            <motion.div
              key={photo.alt}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.3 + i * 0.1,
              }}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${
                i === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-charcoal)]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-white text-sm font-medium">
                  {photo.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: 0.5,
          }}
          className="text-center"
        >
          <p className="text-white/50 text-sm uppercase tracking-widest mb-4">
            Our Services Available At
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {cities.map((city, i) => (
              <span key={city} className="flex items-center gap-2">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="px-5 py-2 bg-white/10 border border-[var(--brand-teal)]/30 text-[var(--brand-teal)] font-medium rounded-full text-sm hover:bg-[var(--brand-teal)] hover:text-white cursor-pointer transition-all duration-200"
                >
                  {city}
                </motion.span>

                {i < cities.length - 1 && (
                  <span className="text-white/20 hidden sm:inline">
                    |
                  </span>
                )}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
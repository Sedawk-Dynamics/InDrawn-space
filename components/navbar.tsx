"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Phone, ChevronDown } from "lucide-react"
import Image from "next/image"

const navLinks = [
  { label: "Home", href: "#hero" },
  {
    label: "Services",
    href: "#services",
    dropdown: [
      "Living Room",
      "Bedroom",
      "Kitchen",
      "Study Room",
      "Full Home",
    ],
  },
  { label: "Designs", href: "#designs" },
  { label: "Why Us", href: "#why-us" },
  { label: "Our Team", href: "#designers" },
  // { label: "Experience Centre", href: "#experience" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-white/95 backdrop-blur-md shadow-md"
        : "bg-white"
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <motion.a
            href="#hero"
            whileHover={{ scale: 1.02 }}
            className="flex items-center shrink-0"
          >
            <Image
              src="/indawn-logo.png"
              alt="InDawn Space"
              width={320}
              height={100}
              priority
              className="h-20 lg:h-24 w-auto object-contain"
            />
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() =>
                  link.dropdown && setActiveDropdown(link.label)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={link.href}
                  className="flex items-center gap-1 text-[15px] font-medium text-gray-800 hover:text-[#0ea5a8] transition-colors duration-200"
                >
                  {link.label}
                  {link.dropdown && (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </a>

                {/* Dropdown */}
                <AnimatePresence>
                  {link.dropdown &&
                    activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-3 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                      >
                        {link.dropdown.map((item) => (
                          <a
                            key={item}
                            href="#designs"
                            className="block px-5 py-3 text-sm text-gray-700 hover:bg-[#0ea5a8] hover:text-white transition-colors duration-150"
                          >
                            {item}
                          </a>
                        ))}
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right Side CTA */}
          <div className="hidden lg:flex items-center gap-5 shrink-0">

            {/* Phone */}
            <a
              href="tel:+919326969679"
              className="flex items-center gap-2 text-[#0ea5a8] font-medium text-sm whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              +91 9326 969 679
            </a>

            {/* CTA Button */}
            <motion.a
              href="#experience"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="px-7 py-3 bg-[var(--brand-gold)] hover:bg-[var(--brand-gold-dark)] text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all whitespace-nowrap"
            >
              Free Consultation
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="text-gray-800" />
            ) : (
              <Menu className="text-gray-800" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white shadow-xl border-t"
          >
            <nav className="px-6 py-5 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-gray-800 font-medium py-2 border-b border-gray-100 hover:text-[#0ea5a8] transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <div className="flex gap-3 mt-4">
                <a
                  href="tel:+919326969679"
                  className="flex-1 border border-[#0ea5a8] text-[#0ea5a8] py-3 rounded-xl text-center font-semibold"
                >
                  Call Now
                </a>

                <a
                  href="#experience"
                  className="flex-1 bg-[var(--brand-gold)] hover:bg-[var(--brand-gold-dark)] text-white py-3 rounded-xl text-center font-semibold transition-all"
                >
                  Consult
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
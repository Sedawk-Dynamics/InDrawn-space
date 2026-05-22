"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Phone, Mail, Globe, Instagram, Facebook, Youtube, Twitter, Linkedin, MapPin, ArrowRight } from "lucide-react"

const services = [
  "Living Room Design",
  "Bedroom Interiors",
  "Modular Kitchen",
  "Dining Room",
  "Home Office",
  "Full Home Makeover",
  "Vastu-Compliant Design",
  "3D Visualization",
]

const quickLinks = [
  { label: "About Us", href: "#founded" },
  { label: "Our Designers", href: "#designers" },
  { label: "Design Gallery", href: "#designs" },
  { label: "Guides", href: "#guides" },
  { label: "Experience Centre", href: "#experience" },
  { label: "Pricing", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Press & Media", href: "#" },
]

const cities = [
  { city: "Address", detail: "Lodha Premier Signet A, Office no 1008, Premier Colony Kalyan-Shil Road, Dombivali East Kalyan, Thane -421204", isPrimary: true },
]

const socials = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Twitter, label: "Twitter/X", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
]

export default function Footer() {
  return (
    <footer id="footer" className="bg-[var(--brand-charcoal)] text-white overflow-hidden">
      {/* Newsletter strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-xl text-white mb-1">Get Design Inspiration Straight to Your Inbox</h3>
              <p className="text-white/50 text-sm">Monthly curations, tips, and exclusive offers.</p>
            </div>
            <form className="flex gap-2 w-full sm:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 sm:w-64 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:border-[var(--brand-teal)] transition-colors"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-3 bg-[var(--brand-gold)] text-white text-sm font-semibold rounded-xl flex items-center gap-1.5 hover:bg-[var(--brand-gold-dark)] transition-colors"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Image
              src="/indawn-logo.png"
              alt="InDawn Space – living meets luxury"
              width={600}
              height={180}
              className="h-24 lg:h-28 w-auto object-contain"
              priority
            />
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              InDawn Space — where living meets luxury. Founded by architects, driven by design excellence, trusted by 15,000+ families across India.
            </p>

            {/* Socials */}
            <div className="flex gap-3 flex-wrap">
              {socials.map((s) => {
                const Icon = s.icon
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    whileHover={{ scale: 1.15, y: -2 }}
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-[var(--brand-teal)] hover:text-white transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Our Services</h4>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s}>
                  <a
                    href="#designs"
                    className="text-white/55 text-sm hover:text-[var(--brand-teal)] transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[var(--brand-teal)] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-white/55 text-sm hover:text-[var(--brand-teal)] transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[var(--brand-teal)] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Locations */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Contact & Locations</h4>
            <div className="flex flex-col gap-3 mb-6">
              <a href="tel:+919326969679" className="flex items-center gap-2.5 text-white/60 text-sm hover:text-[var(--brand-teal)] transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0 text-[var(--brand-teal)]" />
                +91 9326 969 679
              </a>
              <a href="tel:+919372569679" className="flex items-center gap-2.5 text-white/60 text-sm hover:text-[var(--brand-teal)] transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0 text-[var(--brand-teal)]" />
                +91 9372 569 679
              </a>
              <a href="mailto:info@indawn.in" className="flex items-center gap-2.5 text-white/60 text-sm hover:text-[var(--brand-teal)] transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0 text-[var(--brand-teal)]" />
                Info@Indawn.In
              </a>
              <a href="https://www.indawnspace.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-white/60 text-sm hover:text-[var(--brand-teal)] transition-colors">
                <Globe className="w-4 h-4 flex-shrink-0 text-[var(--brand-teal)]" />
                www.indawnspace.com
              </a>
            </div>

            <div className="flex flex-col gap-2">
              {cities.map((c) => (
                <div key={c.city} className="flex items-start gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-[var(--brand-gold)] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white/80 text-xs font-medium">{c.city}</span>
                    <span className="text-white/40 text-xs"> — {c.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gold accent line */}
      <div className="h-0.5 bg-[var(--brand-gold)]/30 mx-4 sm:mx-6 lg:mx-8 rounded-full" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 text-xs">
          <p>© {new Date().getFullYear()} InDawn Space™. All rights reserved. | Living Meets Luxury</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[var(--brand-teal)] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--brand-teal)] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[var(--brand-teal)] transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

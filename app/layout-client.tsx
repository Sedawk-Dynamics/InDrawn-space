'use client'

import { useState, useEffect } from 'react'
import EnquiryForm from '@/components/enquiry-form'
import FloatingCTAButtons from '@/components/floating-cta-buttons'
import FloatingEnquireButton from '@/components/floating-enquire-button'
import ChatBot from '@/components/chatbot'
import AppointmentCalendar from '@/components/appointment-calendar'
import { AppProvider } from './app-context'

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const [appointmentOpen, setAppointmentOpen] = useState(false)

  // Auto pop-up the enquiry form every 45 seconds (only if nothing else is open)
  useEffect(() => {
    const interval = setInterval(() => {
      setEnquiryOpen((isOpen) => {
        if (isOpen || appointmentOpen) return isOpen
        return true
      })
    }, 45000)

    return () => clearInterval(interval)
  }, [appointmentOpen])

  return (
    <AppProvider>
      {children}
      <EnquiryForm isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
      <AppointmentCalendar isOpen={appointmentOpen} onClose={() => setAppointmentOpen(false)} />
      <FloatingCTAButtons />
      <FloatingEnquireButton onClick={() => setEnquiryOpen(true)} />
      <ChatBot />
    </AppProvider>
  )
}

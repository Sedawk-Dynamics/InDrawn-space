'use client'

import { useState } from 'react'
import EnquiryForm from '@/components/enquiry-form'
import FloatingCTAButtons from '@/components/floating-cta-buttons'
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

  return (
    <AppProvider>
      {children}
      <EnquiryForm isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
      <AppointmentCalendar isOpen={appointmentOpen} onClose={() => setAppointmentOpen(false)} />
      <FloatingCTAButtons />
      <ChatBot />
    </AppProvider>
  )
}

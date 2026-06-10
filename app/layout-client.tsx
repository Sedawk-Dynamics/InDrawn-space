'use client'

import { useEffect } from 'react'
import EnquiryForm from '@/components/enquiry-form'
import FloatingCTAButtons from '@/components/floating-cta-buttons'
import FloatingEnquireButton from '@/components/floating-enquire-button'
import ChatBot from '@/components/chatbot'
import AppointmentCalendar from '@/components/appointment-calendar'
import { AppProvider, useApp } from './app-context'

/**
 * Inner shell — runs inside AppProvider so it can read the shared
 * chat/enquiry/lead state and coordinate every floating element.
 */
function LayoutShell({ children }: { children: React.ReactNode }) {
  const {
    enquiryOpen,
    setEnquiryOpen,
    appointmentOpen,
    setAppointmentOpen,
    chatOpen,
    leadCaptured,
    setLeadCaptured,
  } = useApp()

  // Smart lead capture: only surface the enquiry popup when the chatbot is
  // closed/inactive, nothing else is open, and the user hasn't already shared
  // their details. This avoids interrupting an active conversation while still
  // recovering leads from visitors who leave chat without converting.
  useEffect(() => {
    const canPrompt = () =>
      !chatOpen && !enquiryOpen && !appointmentOpen && !leadCaptured

    // Time-based prompt (~25s of inactivity outside chat).
    const interval = setInterval(() => {
      if (canPrompt()) setEnquiryOpen(true)
    }, 25000)

    // Exit-intent prompt (desktop): cursor leaves the top of the viewport.
    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && canPrompt()) setEnquiryOpen(true)
    }
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      clearInterval(interval)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [chatOpen, enquiryOpen, appointmentOpen, leadCaptured, setEnquiryOpen])

  return (
    <>
      {children}
      <EnquiryForm
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        onSuccess={() => setLeadCaptured(true)}
      />
      <AppointmentCalendar
        isOpen={appointmentOpen}
        onClose={() => setAppointmentOpen(false)}
      />
      <FloatingCTAButtons />
      <FloatingEnquireButton onClick={() => setEnquiryOpen(true)} />
      <ChatBot />
    </>
  )
}

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppProvider>
      <LayoutShell>{children}</LayoutShell>
    </AppProvider>
  )
}

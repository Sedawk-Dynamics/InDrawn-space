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

  // Smart lead capture: surface the enquiry popup only when the chatbot is
  // closed/inactive, nothing else is open, and the user hasn't already shared
  // their details. This avoids interrupting an active conversation while still
  // recovering leads from visitors who leave chat without converting.
  //
  // We use a one-shot 45s timeout (not a repeating interval) and bail out while
  // anything is already open. Because the effect re-runs when `enquiryOpen`
  // flips back to false, closing the popup schedules a FRESH 45s countdown —
  // so it never reopens immediately, only a full 45s after the last close.
  useEffect(() => {
    // Don't schedule while the popup (or chat/appointment) is open, or once the
    // lead is captured.
    if (chatOpen || enquiryOpen || appointmentOpen || leadCaptured) return

    const canPrompt = () =>
      !chatOpen && !enquiryOpen && !appointmentOpen && !leadCaptured

    // Time-based prompt: 45s after load / after the popup was last closed.
    const timer = setTimeout(() => {
      if (canPrompt()) setEnquiryOpen(true)
    }, 45000)

    // Exit-intent prompt (desktop): cursor leaves the top of the viewport.
    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && canPrompt()) setEnquiryOpen(true)
    }
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      clearTimeout(timer)
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

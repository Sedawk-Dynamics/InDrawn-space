'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface AppContextType {
  enquiryOpen: boolean
  setEnquiryOpen: (open: boolean) => void
  appointmentOpen: boolean
  setAppointmentOpen: (open: boolean) => void
  /** True while the chatbot panel is open (full priority on mobile). */
  chatOpen: boolean
  setChatOpen: (open: boolean) => void
  /** True once the user has shared lead details (in chat or via the enquiry form). */
  leadCaptured: boolean
  setLeadCaptured: (captured: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const [appointmentOpen, setAppointmentOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [leadCaptured, setLeadCaptured] = useState(false)

  return (
    <AppContext.Provider
      value={{
        enquiryOpen,
        setEnquiryOpen,
        appointmentOpen,
        setAppointmentOpen,
        chatOpen,
        setChatOpen,
        leadCaptured,
        setLeadCaptured,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

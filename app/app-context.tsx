'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface AppContextType {
  enquiryOpen: boolean
  setEnquiryOpen: (open: boolean) => void
  appointmentOpen: boolean
  setAppointmentOpen: (open: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const [appointmentOpen, setAppointmentOpen] = useState(false)

  return (
    <AppContext.Provider
      value={{
        enquiryOpen,
        setEnquiryOpen,
        appointmentOpen,
        setAppointmentOpen,
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

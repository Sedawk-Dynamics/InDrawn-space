import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import RootLayoutClient from './layout-client'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'InDawn Space – Living Meets Luxury | Premium Interior Design',
  description:
    'InDawn Space delivers luxury interior design solutions across Dombivli, Thane, Mumbai & Navi Mumbai. 88+ dream homes delivered. Free 3D design & consultation.',
  keywords: 'interior design, luxury home, Mumbai interior, InDawn Space, modular kitchen, home decor India, Dombivli',
  openGraph: {
    title: 'InDawn Space – Living Meets Luxury',
    description: 'Transform your space into luxury living with InDawn Space.',
    type: 'website',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    userScalable: false,
    viewportFit: 'cover',
  },
  themeColor: '#1a8a80',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        <RootLayoutClient>
          {children}
        </RootLayoutClient>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

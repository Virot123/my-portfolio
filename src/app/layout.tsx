import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Van Virot',
  description: 'Full-Stack Developer & IoT Enthusiast Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
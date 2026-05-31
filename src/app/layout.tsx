import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '(IM)MEMORIALIS — VIIXE',
  description: 'DÉJÀ VU: Luna Caerulea Oriens · 1st VIIXE Fanmeeting · The moon has been waiting for you.',
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

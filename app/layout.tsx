import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chat Assistant',
  description: 'Interactive chat assistant application',
  icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="w-screen h-screen bg-[var(--background-color)]">
      <body className={`${inter.className} w-screen h-screen p-4`}>
        {children}
      </body>
    </html>
  )
}

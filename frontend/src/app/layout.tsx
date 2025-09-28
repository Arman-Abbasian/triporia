import type { Metadata } from 'next'
import { Roboto_Flex, Roboto_Mono } from 'next/font/google'
import '../styles/globals.css'

const roboto_flex = Roboto_Flex({
  variable: '--font-roboto-flex',
  subsets: ['latin'],
})

const roboto_mono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Triporia',
  description: 'introduce best places in the world',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto_flex.variable} ${roboto_mono.variable} antialiased h-screen overflow-auto`}
      >
        {children}
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Roboto_Flex, Roboto_Mono } from 'next/font/google'
import '../styles/globals.css'
import { Providers } from '@/configs/redux'

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
        className={`${roboto_flex.variable} ${roboto_mono.variable} antialiased h-screen overflow-auto p-4`}
        style={{
          backgroundImage: 'url(/images/background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

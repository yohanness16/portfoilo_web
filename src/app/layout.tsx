import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'YOHANNES // ENGINEER',
  description: 'Full-Stack Engineer — ML/AI · Frontend · Systems · Backend. Addis Ababa, Ethiopia.',
  keywords: ['portfolio', 'full-stack', 'ML', 'AI', 'React', 'Next.js', 'Python', 'Rust'],
  authors: [{ name: 'Yohannes Desalegn' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;600;700;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}

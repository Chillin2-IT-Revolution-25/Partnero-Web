import 'aos/dist/aos.css'
import type { Metadata } from 'next'
import ClientLayout from './ClientLayout'
import './globals.css'


export const metadata: Metadata = {
  title: {
    template: '%s | Partnero',
    default: 'Partnero - Business Partnership Platform'
  },
  description: 'Connect with businesses and creators for meaningful partnerships',
  keywords: ['business partnerships', 'collaboration', 'influencer marketing'],
  authors: [{ name: 'Partnero Team' }],
  creator: 'Partnero',
  publisher: 'Partnero',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
import './globals.css'
import { Inter } from 'next/font/google'
// import Layout from '@/components/Layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Chiteadas',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

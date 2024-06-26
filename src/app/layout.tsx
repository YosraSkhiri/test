import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Blog App",
  description: "Welcome to BlogSite, your go-to platform for creating, sharing, and discovering captivating blog content! Whether you're a seasoned blogger, an aspiring writer, or an avid reader, BlogSite offers everything you need to immerse yourself in the world of blogging.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='max-w-3xl mx-auto py-10 px-2'>
          {children}
        </div>
      </body>
    </html>
  )
}

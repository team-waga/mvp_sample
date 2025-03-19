import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { MobileNav } from "@/components/mobile-nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WAGA Coffee Traceability",
  description: "Ethiopian Coffee Traceability Platform",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function SimpleLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {/* Mobile Navigation */}
          <MobileNav />

          {/* Main content - centered with flex */}
          <div className="flex justify-center">
            <main className="w-full max-w-screen-xl px-4 py-4">{children}</main>
          </div>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}


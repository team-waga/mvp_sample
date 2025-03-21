import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { WalletConnect } from "@/components/wallet-connect"
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

export default function CenteredLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            {/* Mobile Navigation - visible only on mobile */}
            <MobileNav />

            <div className="flex flex-1">
              {/* Sidebar - hidden on mobile */}
              <aside className="hidden md:block w-64 shrink-0">
                <div className="fixed inset-y-0 z-50 w-64 bg-slate-50 dark:bg-slate-900">
                  <Sidebar />
                </div>
              </aside>

              {/* Main content */}
              <main className="flex-1 w-full">
                <div className="container mx-auto px-4 py-4 md:px-6 md:py-6">
                  <div className="flex justify-end mb-4">
                    <WalletConnect />
                  </div>
                  {children}
                </div>
              </main>
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}


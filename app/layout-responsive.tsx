import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { WalletConnect } from "@/components/wallet-connect"
import { MobileMenu } from "@/components/mobile-menu"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WAGA Coffee Traceability",
  description: "Ethiopian Coffee Traceability Platform",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="h-screen flex">
            <div className="hidden md:flex h-full w-72 flex-col fixed inset-y-0 z-50">
              <Sidebar />
            </div>
            <main className="md:pl-72 pt-6 md:pt-8 w-full overflow-y-auto">
              <div className="px-4 md:px-8 pb-8">
                <div className="flex justify-between items-center mb-4">
                  <MobileMenu />
                  <WalletConnect />
                </div>
                {children}
              </div>
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}


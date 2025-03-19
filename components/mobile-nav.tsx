"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Coffee,
  Package,
  ShieldCheck,
  BarChart3,
  Settings,
  Users,
  Home,
  QrCode,
  RefreshCw,
  Wallet,
  Info,
  Linkedin,
  Twitter,
} from "lucide-react"

const routes = [
  {
    label: "Home",
    icon: Home,
    href: "/home",
    color: "text-amber-500",
  },
  {
    label: "About",
    icon: Info,
    href: "/home/about",
    color: "text-green-500",
  },
  {
    label: "Dashboard",
    icon: BarChart3,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Batches",
    icon: Coffee,
    href: "/batches",
    color: "text-violet-500",
  },
  {
    label: "Inventory",
    icon: BarChart3,
    href: "/inventory",
    color: "text-pink-700",
  },
  {
    label: "Verification",
    icon: ShieldCheck,
    href: "/verification",
    color: "text-orange-500",
  },
  {
    label: "Mint Tokens",
    icon: RefreshCw,
    href: "/mint-batch",
    color: "text-emerald-500",
  },
  {
    label: "Redemption",
    icon: Package,
    href: "/redemption",
    color: "text-green-700",
  },
  {
    label: "Batch Metadata",
    icon: QrCode,
    href: "/batch-metadata",
    color: "text-blue-600",
  },
  {
    label: "QR Generator",
    icon: QrCode,
    href: "/qr-generator",
    color: "text-purple-600",
  },
  {
    label: "Distributor Registration",
    icon: Wallet,
    href: "/distributor/register",
    color: "text-amber-500",
  },
  {
    label: "Users",
    icon: Users,
    href: "/users",
    color: "text-yellow-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-gray-500",
  },
]

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden sticky top-0 z-40 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <div className="flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <h1 className="text-xl font-bold">WAGA Coffee</h1>
        </Link>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50">
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
                <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
                  <h1 className="text-xl font-bold">WAGA Coffee</h1>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex-1 overflow-auto py-4">
                <div className="space-y-1 px-3">
                  {routes.map((route) => (
                    <Button
                      key={route.href}
                      variant={pathname === route.href ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start",
                        pathname === route.href ? "bg-slate-200 dark:bg-slate-800" : "",
                      )}
                      asChild
                      onClick={() => setOpen(false)}
                    >
                      <Link href={route.href}>
                        <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                        {route.label}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
                  <div className="text-sm font-medium">Bringing Ethiopian Coffee Onchain</div>
                </div>
                <div className="mt-4 flex justify-center items-center gap-4">
                  <a
                    href="https://t.me/wagatoken"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-blue-400 transition-colors"
                    aria-label="Telegram"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-send"
                    >
                      <path d="m22 2-7 20-4-9-9-4Z" />
                      <path d="M22 2 11 13" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/waga-token-official/?viewAsMember=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-blue-600 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="https://x.com/Wagatoken"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-sky-500 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter size={20} />
                  </a>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}


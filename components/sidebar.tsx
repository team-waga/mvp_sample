"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full py-4 overflow-y-auto">
      <div className="px-3 py-2 mb-6">
        <Link href="/" className="flex items-center pl-3">
          <h1 className="text-2xl font-bold">WAGA Coffee</h1>
        </Link>
      </div>
      <div className="flex-1 px-3">
        <div className="space-y-1">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "default" : "ghost"}
              className={cn("w-full justify-start", pathname === route.href ? "bg-slate-200 dark:bg-slate-800" : "")}
              asChild
            >
              <Link href={route.href}>
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
      <div className="px-3 py-2 mt-auto">
        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
          <div className="text-sm font-medium">Bringing Ethiopian Coffee Onchain</div>
        </div>
      </div>
    </div>
  )
}


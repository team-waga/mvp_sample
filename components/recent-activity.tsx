"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Coffee, Package, ShieldCheck, RefreshCw } from "lucide-react"

// Sample data for recent activities
const activities = [
  {
    id: 1,
    type: "batch_created",
    batchId: 1045,
    batchName: "Rwanda Nyungwe",
    timestamp: "2 hours ago",
    user: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JD",
    },
  },
  {
    id: 2,
    type: "batch_verified",
    batchId: 1044,
    batchName: "Costa Rica Tarrazu",
    timestamp: "5 hours ago",
    user: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS",
    },
  },
  {
    id: 3,
    type: "batch_minted",
    batchId: 1043,
    batchName: "Ethiopia Yirgacheffe",
    timestamp: "1 day ago",
    user: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AJ",
    },
  },
  {
    id: 4,
    type: "inventory_updated",
    batchId: 1042,
    batchName: "Ethiopia Sidama",
    timestamp: "2 days ago",
    user: {
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SW",
    },
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start">
          <div className="mr-4 mt-0.5">
            <Avatar className="h-9 w-9">
              <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
              <AvatarFallback>{activity.user.initials}</AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.user.name}
              {activity.type === "batch_created" && <span className="text-muted-foreground"> created batch </span>}
              {activity.type === "batch_verified" && <span className="text-muted-foreground"> verified batch </span>}
              {activity.type === "batch_minted" && <span className="text-muted-foreground"> minted tokens for </span>}
              {activity.type === "inventory_updated" && (
                <span className="text-muted-foreground"> updated inventory for </span>
              )}
              <span className="font-medium">
                #{activity.batchId} - {activity.batchName}
              </span>
            </p>
            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
          </div>
          <div className="ml-auto">
            {activity.type === "batch_created" && <Coffee className="h-5 w-5 text-blue-500" />}
            {activity.type === "batch_verified" && <ShieldCheck className="h-5 w-5 text-green-500" />}
            {activity.type === "batch_minted" && <Package className="h-5 w-5 text-purple-500" />}
            {activity.type === "inventory_updated" && <RefreshCw className="h-5 w-5 text-amber-500" />}
          </div>
        </div>
      ))}
    </div>
  )
}


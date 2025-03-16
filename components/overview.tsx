"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// Sample data for the chart
const data = [
  {
    name: "Jan",
    total: 1200,
  },
  {
    name: "Feb",
    total: 1100,
  },
  {
    name: "Mar",
    total: 1300,
  },
  {
    name: "Apr",
    total: 1400,
  },
  {
    name: "May",
    total: 1200,
  },
  {
    name: "Jun",
    total: 1500,
  },
  {
    name: "Jul",
    total: 1300,
  },
  {
    name: "Aug",
    total: 1600,
  },
  {
    name: "Sep",
    total: 1700,
  },
  {
    name: "Oct",
    total: 1400,
  },
  {
    name: "Nov",
    total: 1200,
  },
  {
    name: "Dec",
    total: 1100,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => {
            // On small screens, show fewer labels
            const width = window.innerWidth
            if (width < 640) {
              // For mobile, only show every other month
              const index = data.findIndex((item) => item.name === value)
              return index % 2 === 0 ? value : ""
            }
            return value
          }}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value} kg`}
          width={50}
        />
        <Tooltip
          formatter={(value) => [`${value} kg`, "Inventory"]}
          labelFormatter={(label) => `Month: ${label}`}
          cursor={{ fill: "rgba(200, 200, 200, 0.1)" }}
        />
        <Bar dataKey="total" fill="#4f46e5" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}


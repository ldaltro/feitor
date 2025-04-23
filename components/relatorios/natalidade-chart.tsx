"use client"

import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface NatalidadeChartProps {
  data: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
    }[]
  }
}

export function NatalidadeChart({ data }: NatalidadeChartProps) {
  // Transform the data from our API format to Recharts format
  const transformedData = data.labels.map((label, index) => {
    const item: any = { month: label }
    
    // Add each dataset value at this index
    data.datasets.forEach((dataset) => {
      item[dataset.label] = dataset.data[index]
    })
    
    return item
  })

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={transformedData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        {data.datasets.map((dataset, index) => (
          <Bar 
            key={dataset.label}
            dataKey={dataset.label} 
            name={dataset.label}
            fill={getChartColor(index)}
            radius={[4, 4, 0, 0]} 
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}

// Helper function to get colors for the chart
function getChartColor(index: number): string {
  const colors = [
    "#4f46e5", // Primary blue
    "#8b5cf6", // Purple
    "#10b981", // Green
    "#ef4444", // Red
    "#f59e0b", // Orange
    "#06b6d4", // Cyan
  ]
  
  return colors[index % colors.length]
}

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowDownRight, ArrowUpRight, TrendingUp } from "lucide-react"
import { AreaChart, LineChart } from "recharts"
import { Area, CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type SalesData = {
  date: string
  amount: number
}

export default function AnalyticsPage() {
  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [totalSales, setTotalSales] = useState(0)
  const [averageSales, setAverageSales] = useState(0)
  const [growthRate, setGrowthRate] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
    } else {
      loadAnalyticsData()
    }
  }, [router])

  const loadAnalyticsData = () => {
    // Simulating data fetch
    const mockData: SalesData[] = [
      { date: "2024-01", amount: 15000 },
      { date: "2024-02", amount: 18000 },
      { date: "2024-03", amount: 12000 },
      { date: "2024-04", amount: 21000 },
      { date: "2024-05", amount: 16000 },
      { date: "2024-06", amount: 19000 },
    ]

    setSalesData(mockData)
    const total = mockData.reduce((sum, item) => sum + item.amount, 0)
    setTotalSales(total)
    setAverageSales(total / mockData.length)

    // Calculate growth rate
    const firstMonth = mockData[0].amount
    const lastMonth = mockData[mockData.length - 1].amount
    const growth = ((lastMonth - firstMonth) / firstMonth) * 100
    setGrowthRate(growth)

    setIsLoading(false)
  }

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h1>
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              <TrendingUp className="h-4 w-4" />
              <span>{growthRate.toFixed(1)}% Growth</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <p className="text-gray-500 text-sm font-medium">Total Sales</p>
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold mt-2">{formatCurrency(totalSales)}</p>
              <div className="mt-4 h-2 bg-gray-100 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '70%' }} />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <p className="text-gray-500 text-sm font-medium">Average Monthly</p>
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold mt-2">{formatCurrency(averageSales)}</p>
              <div className="mt-4 h-2 bg-gray-100 rounded-full">
                <div className="h-2 bg-purple-500 rounded-full" style={{ width: '60%' }} />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <p className="text-gray-500 text-sm font-medium">Monthly Growth</p>
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              </div>
              <p className="text-2xl font-bold mt-2">+{growthRate.toFixed(1)}%</p>
              <div className="mt-4 h-2 bg-gray-100 rounded-full">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: '45%' }} />
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(date: string | number | Date) => new Date(date).toLocaleDateString('en-US', { month: 'short' })}
                    />
                    <YAxis tickFormatter={(value: number) => `$${value / 1000}k`} />
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                      labelFormatter={(label: string | number | Date) => new Date(label).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="#4F46E5"
                      strokeWidth={2}
                      dot={{ fill: "#4F46E5", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Revenue Distribution</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(date: string | number | Date) => new Date(date).toLocaleDateString('en-US', { month: 'short' })}
                    />
                    <YAxis tickFormatter={(value: number) => `$${value / 1000}k`} />
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                      labelFormatter={(label: string | number | Date) => new Date(label).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="#8B5CF6"
                      fill="url(#colorGradient)"
                      strokeWidth={2}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold">Detailed Sales Data</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Month
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Growth
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {salesData.map((item, index) => {
                    const growth = index > 0
                      ? ((item.amount - salesData[index - 1].amount) / salesData[index - 1].amount) * 100
                      : 0
                    return (
                      <tr key={item.date} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {new Date(item.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {formatCurrency(item.amount)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 text-sm font-medium
                            ${growth > 0 ? 'text-green-600' : growth < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                            {growth > 0 ? '+' : ''}{growth.toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
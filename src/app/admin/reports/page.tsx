"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select } from "@/components/ui/select"
import { 
  DollarSign, 
  Calendar, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  BarChart3,
  Loader2
} from "lucide-react"
import { formatPrice } from "@/lib/utils"
import type { Booking } from "@/types"

type DateRange = "today" | "week" | "month" | "year" | "all"

interface Stats {
  totalBookings: number
  completedBookings: number
  pendingBookings: number
  inProgressBookings: number
  totalRevenue: number
  averageOrderValue: number
}

export default function AdminReportsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState<DateRange>("month")
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    completedBookings: 0,
    pendingBookings: 0,
    inProgressBookings: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
  })

  useEffect(() => {
    fetchBookings()
  }, [])

  useEffect(() => {
    calculateStats()
  }, [bookings, dateRange])

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/bookings")
      if (response.ok) {
        const data = await response.json()
        setBookings(data.bookings || [])
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error)
    } finally {
      setLoading(false)
    }
  }

  const getDateRangeStart = (range: DateRange): Date => {
    const now = new Date()
    switch (range) {
      case "today":
        return new Date(now.getFullYear(), now.getMonth(), now.getDate())
      case "week":
        const weekStart = new Date(now)
        weekStart.setDate(now.getDate() - now.getDay())
        weekStart.setHours(0, 0, 0, 0)
        return weekStart
      case "month":
        return new Date(now.getFullYear(), now.getMonth(), 1)
      case "year":
        return new Date(now.getFullYear(), 0, 1)
      case "all":
        return new Date(0)
    }
  }

  const calculateStats = () => {
    const startDate = getDateRangeStart(dateRange)
    
    const filteredBookings = bookings.filter(booking => {
      const bookingDate = new Date(booking.createdAt)
      return bookingDate >= startDate
    })

    const completedBookings = filteredBookings.filter(b => b.status === "COMPLETED")
    const pendingBookings = filteredBookings.filter(b => b.status === "PENDING")
    const inProgressBookings = filteredBookings.filter(b => b.status === "IN_PROGRESS")
    
    const totalRevenue = completedBookings.reduce(
      (sum, b) => sum + (b.finalPrice || b.estimatedPrice), 
      0
    )

    setStats({
      totalBookings: filteredBookings.length,
      completedBookings: completedBookings.length,
      pendingBookings: pendingBookings.length,
      inProgressBookings: inProgressBookings.length,
      totalRevenue,
      averageOrderValue: completedBookings.length > 0 
        ? totalRevenue / completedBookings.length 
        : 0,
    })
  }

  const getServiceBreakdown = () => {
    const startDate = getDateRangeStart(dateRange)
    const filteredBookings = bookings.filter(booking => {
      const bookingDate = new Date(booking.createdAt)
      return bookingDate >= startDate
    })

    const serviceMap: Record<string, { count: number; revenue: number }> = {}
    
    filteredBookings.forEach(booking => {
      const serviceName = booking.service?.name || "Unknown"
      if (!serviceMap[serviceName]) {
        serviceMap[serviceName] = { count: 0, revenue: 0 }
      }
      serviceMap[serviceName].count++
      if (booking.status === "COMPLETED") {
        serviceMap[serviceName].revenue += booking.finalPrice || booking.estimatedPrice
      }
    })

    return Object.entries(serviceMap)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.count - a.count)
  }

  const getStatusBreakdown = () => {
    const startDate = getDateRangeStart(dateRange)
    const filteredBookings = bookings.filter(booking => {
      const bookingDate = new Date(booking.createdAt)
      return bookingDate >= startDate
    })

    const statusMap: Record<string, number> = {
      PENDING: 0,
      CONFIRMED: 0,
      IN_PROGRESS: 0,
      COMPLETED: 0,
      CANCELLED: 0,
    }

    filteredBookings.forEach(booking => {
      statusMap[booking.status]++
    })

    return statusMap
  }

  const getDailyBookings = () => {
    const startDate = getDateRangeStart(dateRange)
    const filteredBookings = bookings.filter(booking => {
      const bookingDate = new Date(booking.createdAt)
      return bookingDate >= startDate
    })

    const dailyMap: Record<string, number> = {}
    
    filteredBookings.forEach(booking => {
      const date = new Date(booking.createdAt).toLocaleDateString()
      dailyMap[date] = (dailyMap[date] || 0) + 1
    })

    return Object.entries(dailyMap)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-7)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  const serviceBreakdown = getServiceBreakdown()
  const statusBreakdown = getStatusBreakdown()
  const dailyBookings = getDailyBookings()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-500">Track your business performance</p>
        </div>
        <Select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value as DateRange)}
          className="w-40"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
          <option value="all">All Time</option>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatPrice(stats.totalRevenue)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Bookings</p>
                <p className="text-2xl font-bold">{stats.totalBookings}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold">{stats.completedBookings}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg Order Value</p>
                <p className="text-2xl font-bold">
                  {formatPrice(stats.averageOrderValue)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Status Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Bookings by Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(statusBreakdown).map(([status, count]) => {
                const total = Object.values(statusBreakdown).reduce((a, b) => a + b, 0)
                const percentage = total > 0 ? (count / total) * 100 : 0
                const colors: Record<string, string> = {
                  PENDING: "bg-yellow-500",
                  CONFIRMED: "bg-blue-500",
                  IN_PROGRESS: "bg-purple-500",
                  COMPLETED: "bg-green-500",
                  CANCELLED: "bg-red-500",
                }
                return (
                  <div key={status}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">
                        {status.replace("_", " ")}
                      </span>
                      <span className="text-gray-500">{count} ({percentage.toFixed(1)}%)</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${colors[status]} transition-all`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Service Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Top Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            {serviceBreakdown.length > 0 ? (
              <div className="space-y-4">
                {serviceBreakdown.slice(0, 5).map((service, index) => (
                  <div key={service.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-600">
                        {index + 1}
                      </span>
                      <span className="font-medium">{service.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{service.count} bookings</p>
                      <p className="text-sm text-gray-500">{formatPrice(service.revenue)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">No service data available</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Daily Bookings (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dailyBookings.length > 0 ? (
              <div className="flex items-end justify-between gap-2 h-40">
                {dailyBookings.map((day) => {
                  const maxCount = Math.max(...dailyBookings.map(d => d.count), 1)
                  const height = (day.count / maxCount) * 100
                  return (
                    <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-xs font-medium">{day.count}</span>
                      <div 
                        className="w-full bg-blue-500 rounded-t transition-all"
                        style={{ height: `${Math.max(height, 5)}%` }}
                      />
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {new Date(day.date).toLocaleDateString(undefined, { 
                          weekday: 'short',
                          month: 'numeric',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">No booking data available</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <Clock className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
            <p className="text-2xl font-bold">{stats.pendingBookings}</p>
            <p className="text-sm text-gray-500">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Clock className="h-8 w-8 mx-auto text-purple-500 mb-2" />
            <p className="text-2xl font-bold">{stats.inProgressBookings}</p>
            <p className="text-sm text-gray-500">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <CheckCircle className="h-8 w-8 mx-auto text-green-500 mb-2" />
            <p className="text-2xl font-bold">{stats.completedBookings}</p>
            <p className="text-sm text-gray-500">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto text-blue-500 mb-2" />
            <p className="text-2xl font-bold">
              {stats.totalBookings > 0 
                ? Math.round((stats.completedBookings / stats.totalBookings) * 100) 
                : 0}%
            </p>
            <p className="text-sm text-gray-500">Completion Rate</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

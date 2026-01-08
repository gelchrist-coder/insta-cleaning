"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  TrendingUp,
  Users,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Loader2
} from "lucide-react"
import { formatDate, formatPrice, getStatusColor, getStatusLabel } from "@/lib/utils"
import type { Booking, DashboardStats } from "@/types"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentBookings, setRecentBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch recent bookings
        const bookingsRes = await fetch("/api/bookings?limit=5")
        if (bookingsRes.ok) {
          const bookings = await bookingsRes.json()
          setRecentBookings(bookings)
          
          // Calculate stats from bookings (in real app, this would be a separate API)
          const allBookingsRes = await fetch("/api/bookings")
          if (allBookingsRes.ok) {
            const allBookings = await allBookingsRes.json()
            const today = new Date().toDateString()
            const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            
            setStats({
              totalBookings: allBookings.length,
              pendingBookings: allBookings.filter((b: Booking) => b.status === "PENDING").length,
              completedBookings: allBookings.filter((b: Booking) => b.status === "COMPLETED").length,
              totalRevenue: allBookings
                .filter((b: Booking) => b.status === "COMPLETED")
                .reduce((sum: number, b: Booking) => sum + (b.finalPrice || b.estimatedPrice), 0),
              todayBookings: allBookings.filter((b: Booking) => 
                new Date(b.scheduledDate).toDateString() === today
              ).length,
              weeklyBookings: allBookings.filter((b: Booking) => 
                new Date(b.createdAt) >= weekAgo
              ).length,
            })
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats?.totalBookings || 0}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              +{stats?.weeklyBookings || 0} this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {stats?.pendingBookings || 0}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Awaiting confirmation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-3xl font-bold text-green-600">
                  {stats?.completedBookings || 0}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Successfully completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">
                  {formatPrice(stats?.totalRevenue || 0)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              From completed bookings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600">{stats?.todayBookings || 0}</p>
              <p className="text-sm text-gray-600">Bookings Today</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-3xl font-bold text-green-600">
                {recentBookings.filter(b => 
                  b.status === "IN_PROGRESS" && 
                  new Date(b.scheduledDate).toDateString() === new Date().toDateString()
                ).length}
              </p>
              <p className="text-sm text-gray-600">In Progress</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-3xl font-bold text-purple-600">
                {recentBookings.filter(b => b.assignedStaffId).length}
              </p>
              <p className="text-sm text-gray-600">Staff Assigned</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Bookings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Bookings</CardTitle>
          <Link href="/admin/bookings">
            <Button variant="ghost" size="sm">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {recentBookings.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No bookings yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Booking #</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Service</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500"></th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-mono">{booking.bookingNumber}</td>
                      <td className="py-3 px-4 text-sm">{booking.user?.name || booking.guestName || "N/A"}</td>
                      <td className="py-3 px-4 text-sm">{booking.service?.name}</td>
                      <td className="py-3 px-4 text-sm">{formatDate(booking.scheduledDate)}</td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(booking.status)}>
                          {getStatusLabel(booking.status)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">{formatPrice(booking.estimatedPrice)}</td>
                      <td className="py-3 px-4">
                        <Link href={`/admin/bookings/${booking.id}`}>
                          <Button variant="ghost" size="sm">View</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Manage Bookings</h3>
            <p className="text-sm text-gray-600 mb-4">
              View and manage all customer bookings
            </p>
            <Link href="/admin/bookings">
              <Button className="w-full">Go to Bookings</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Manage Services</h3>
            <p className="text-sm text-gray-600 mb-4">
              Add or edit cleaning services and pricing
            </p>
            <Link href="/admin/services">
              <Button variant="outline" className="w-full">Go to Services</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">View Reports</h3>
            <p className="text-sm text-gray-600 mb-4">
              View business analytics and reports
            </p>
            <Link href="/admin/reports">
              <Button variant="outline" className="w-full">Go to Reports</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { 
  Calendar, 
  Clock, 
  MapPin,
  Search,
  Filter,
  ArrowRight,
  Loader2,
  RefreshCw
} from "lucide-react"
import { formatDate, formatPrice, getStatusColor, getStatusLabel } from "@/lib/utils"
import type { Booking } from "@/types"

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("ALL")
  const [search, setSearch] = useState("")

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const url = filter === "ALL" 
        ? "/api/bookings" 
        : `/api/bookings?status=${filter}`
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setBookings(data)
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [filter])

  const filteredBookings = bookings.filter(booking => {
    if (!search) return true
    const searchLower = search.toLowerCase()
    return (
      booking.bookingNumber.toLowerCase().includes(searchLower) ||
      booking.user?.name?.toLowerCase().includes(searchLower) ||
      booking.user?.email?.toLowerCase().includes(searchLower) ||
      booking.guestName?.toLowerCase().includes(searchLower) ||
      booking.guestEmail?.toLowerCase().includes(searchLower) ||
      booking.service?.name.toLowerCase().includes(searchLower)
    )
  })

  const updateStatus = async (bookingId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        fetchBookings()
      }
    } catch (error) {
      console.error("Failed to update status:", error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookings Management</h1>
          <p className="text-gray-600">Manage all customer bookings</p>
        </div>
        <Button onClick={fetchBookings} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by booking #, customer, or service..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-48"
              >
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No bookings found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">Booking #</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">Customer</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">Service</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">Date & Time</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">Location</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">Amount</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <span className="text-sm font-mono">{booking.bookingNumber}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-sm font-medium">{booking.user?.name || booking.guestName || "N/A"}</p>
                          <p className="text-xs text-gray-500">{booking.user?.email || booking.guestEmail || ""}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-sm">{booking.service?.name}</p>
                          <p className="text-xs text-gray-500">{booking.propertyType?.name}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          <p>{formatDate(booking.scheduledDate)}</p>
                          <p className="text-gray-500">{booking.scheduledTime}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm">{booking.city}, {booking.state}</p>
                      </td>
                      <td className="py-4 px-4">
                        <Select
                          value={booking.status}
                          onChange={(e) => updateStatus(booking.id, e.target.value)}
                          className="text-sm h-8"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="CONFIRMED">Confirmed</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="COMPLETED">Completed</option>
                          <option value="CANCELLED">Cancelled</option>
                        </Select>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm font-medium">{formatPrice(booking.estimatedPrice)}</span>
                      </td>
                      <td className="py-4 px-4">
                        <Link href={`/admin/bookings/${booking.id}`}>
                          <Button variant="ghost" size="sm">
                            View
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
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

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {["PENDING", "CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED"].map((status) => (
          <Card key={status}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">
                {bookings.filter(b => b.status === status).length}
              </p>
              <p className="text-sm text-gray-500">{getStatusLabel(status)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

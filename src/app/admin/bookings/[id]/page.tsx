"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
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
  ArrowLeft,
  User,
  Phone,
  Mail,
  FileText,
  Loader2,
  Save
} from "lucide-react"
import { formatDate, formatDateTime, getStatusColor, getStatusLabel, formatPrice } from "@/lib/utils"
import type { Booking, User as UserType } from "@/types"

export default function AdminBookingDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [booking, setBooking] = useState<Booking | null>(null)
  const [staff, setStaff] = useState<UserType[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState("")
  const [assignedStaffId, setAssignedStaffId] = useState("")
  const [finalPrice, setFinalPrice] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch booking
        const bookingRes = await fetch(`/api/bookings/${id}`)
        if (bookingRes.ok) {
          const data = await bookingRes.json()
          setBooking(data)
          setStatus(data.status)
          setAssignedStaffId(data.assignedStaffId || "")
          setFinalPrice(data.finalPrice?.toString() || "")
        } else {
          router.push("/admin/bookings")
        }

        // Fetch staff (in real app, this would be a separate API)
        // For now, we'll leave it empty
      } catch (error) {
        console.error("Failed to fetch data:", error)
        router.push("/admin/bookings")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, router])

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          assignedStaffId: assignedStaffId || null,
          finalPrice: finalPrice ? parseFloat(finalPrice) : null,
        }),
      })

      if (response.ok) {
        const updated = await response.json()
        setBooking(updated)
      }
    } catch (error) {
      console.error("Failed to update booking:", error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!booking) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/bookings">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Bookings
          </Button>
        </Link>
      </div>

      {/* Booking Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Booking #{booking.bookingNumber}
            </h1>
            <Badge className={getStatusColor(booking.status)}>
              {getStatusLabel(booking.status)}
            </Badge>
          </div>
          <p className="text-gray-500">Created on {formatDateTime(booking.createdAt)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{booking.user?.name || booking.guestName || "N/A"}</p>
                  <p className="text-sm text-gray-500">Customer</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{booking.user?.email || booking.guestEmail || ""}</span>
                </div>
                {(booking.user?.phone || booking.guestPhone) && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{booking.user?.phone || booking.guestPhone}</span>
                  </div>
                )}
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Contact Preference:</span>
                <span className="ml-2 font-medium">{booking.contactMethod}</span>
              </div>
            </CardContent>
          </Card>

          {/* Service Details */}
          <Card>
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Service Type</p>
                  <p className="font-medium">{booking.service?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Property Type</p>
                  <p className="font-medium">{booking.propertyType?.name}</p>
                </div>
                {booking.propertySize && (
                  <div>
                    <p className="text-sm text-gray-500">Property Size</p>
                    <p className="font-medium">{booking.propertySize}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">
                    {Math.floor(booking.estimatedDuration / 60)}h {booking.estimatedDuration % 60 > 0 ? `${booking.estimatedDuration % 60}m` : ''}
                  </p>
                </div>
              </div>
              {booking.specialInstructions && (
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                    <FileText className="h-4 w-4" />
                    Special Instructions
                  </p>
                  <p className="p-3 bg-gray-50 rounded-lg text-sm">
                    {booking.specialInstructions}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Schedule & Location */}
          <Card>
            <CardHeader>
              <CardTitle>Schedule & Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{formatDate(booking.scheduledDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-medium">{booking.scheduledTime}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{booking.address}</p>
                    <p className="text-gray-600">
                      {booking.city}, {booking.state}{booking.zipCode ? ` ${booking.zipCode}` : ""}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Admin Actions */}
        <div className="space-y-6">
          {/* Update Status */}
          <Card>
            <CardHeader>
              <CardTitle>Update Booking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assign Staff
                </label>
                <Select
                  value={assignedStaffId}
                  onChange={(e) => setAssignedStaffId(e.target.value)}
                >
                  <option value="">Not Assigned</option>
                  {staff.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  Add staff in Staff Management to assign here
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Final Price (GH₵)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter final price"
                  value={finalPrice}
                  onChange={(e) => setFinalPrice(e.target.value)}
                />
              </div>

              <Button onClick={handleSave} disabled={saving} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>

          {/* Price Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Price Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Estimated Price</span>
                <span className="font-medium">{formatPrice(booking.estimatedPrice)}</span>
              </div>
              {booking.finalPrice && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Final Price</span>
                  <span className="font-bold text-green-600">{formatPrice(booking.finalPrice)}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timestamps */}
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500">Created</p>
                <p className="font-medium">{formatDateTime(booking.createdAt)}</p>
              </div>
              <div>
                <p className="text-gray-500">Last Updated</p>
                <p className="font-medium">{formatDateTime(booking.updatedAt)}</p>
              </div>
              {booking.completedAt && (
                <div>
                  <p className="text-gray-500">Completed</p>
                  <p className="font-medium">{formatDateTime(booking.completedAt)}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

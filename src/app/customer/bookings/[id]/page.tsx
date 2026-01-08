"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowLeft,
  User,
  Phone,
  Mail,
  FileText,
  AlertTriangle,
  Loader2
} from "lucide-react"
import { formatDate, formatDateTime, getStatusColor, getStatusLabel, formatPrice } from "@/lib/utils"
import type { Booking } from "@/types"

export default function BookingDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState(false)

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`/api/bookings/${id}`)
        if (response.ok) {
          const data = await response.json()
          setBooking(data)
        } else {
          router.push("/customer/bookings")
        }
      } catch (error) {
        console.error("Failed to fetch booking:", error)
        router.push("/customer/bookings")
      } finally {
        setLoading(false)
      }
    }

    fetchBooking()
  }, [id, router])

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this booking?")) return

    setCancelling(true)
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CANCELLED" }),
      })

      if (response.ok) {
        const updated = await response.json()
        setBooking(updated)
      }
    } catch (error) {
      console.error("Failed to cancel booking:", error)
    } finally {
      setCancelling(false)
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

  const canCancel = booking.status === "PENDING" || booking.status === "CONFIRMED"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/customer/bookings">
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
              {booking.service?.name}
            </h1>
            <Badge className={getStatusColor(booking.status)}>
              {getStatusLabel(booking.status)}
            </Badge>
          </div>
          <p className="text-gray-500">Booking #{booking.bookingNumber}</p>
        </div>
        {canCancel && (
          <Button
            variant="destructive"
            onClick={handleCancel}
            disabled={cancelling}
          >
            {cancelling ? "Cancelling..." : "Cancel Booking"}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Estimated Duration</p>
                  <p className="font-medium">
                    {Math.floor(booking.estimatedDuration / 60)}h {booking.estimatedDuration % 60 > 0 ? `${booking.estimatedDuration % 60}m` : ''}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">{booking.address}</p>
                  <p className="text-gray-500">
                    {booking.city}, {booking.state}{booking.zipCode ? ` ${booking.zipCode}` : ""}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Details */}
          <Card>
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
              {booking.specialInstructions && (
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    Special Instructions
                  </p>
                  <p className="font-medium mt-1 p-3 bg-gray-50 rounded-lg">
                    {booking.specialInstructions}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Assigned Staff */}
          {booking.assignedStaff && (
            <Card>
              <CardHeader>
                <CardTitle>Assigned Cleaner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">{booking.assignedStaff.name}</p>
                    <p className="text-sm text-gray-500">{booking.assignedStaff.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
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
                  <span className="font-bold text-blue-600">{formatPrice(booking.finalPrice)}</span>
                </div>
              )}
              <hr />
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-blue-600">
                  {formatPrice(booking.finalPrice || booking.estimatedPrice)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Booking Info */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500">Booking Number</p>
                <p className="font-mono font-medium">{booking.bookingNumber}</p>
              </div>
              <div>
                <p className="text-gray-500">Created</p>
                <p className="font-medium">{formatDateTime(booking.createdAt)}</p>
              </div>
              {booking.completedAt && (
                <div>
                  <p className="text-gray-500">Completed</p>
                  <p className="font-medium">{formatDateTime(booking.completedAt)}</p>
                </div>
              )}
              <div>
                <p className="text-gray-500">Contact Preference</p>
                <p className="font-medium">{booking.contactMethod}</p>
              </div>
            </CardContent>
          </Card>

          {/* Help Card */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
              <p className="text-sm text-blue-700 mb-3">
                Have questions about your booking? Contact our support team.
              </p>
              <div className="space-y-2 text-sm">
                <a href="tel:+233552486384" className="flex items-center gap-2 text-blue-600 hover:underline">
                  <Phone className="h-4 w-4" />
                  (+233) 55 248 6384
                </a>
                <a href="mailto:support@instacleaning.com" className="flex items-center gap-2 text-blue-600 hover:underline">
                  <Mail className="h-4 w-4" />
                  support@instacleaning.com
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

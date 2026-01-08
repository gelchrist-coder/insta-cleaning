"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Calendar, Clock, MapPin, ArrowRight, Download, Mail } from "lucide-react"
import { Suspense } from "react"

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get('id')

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for booking with Insta-Cleaning. Your booking has been submitted successfully.
            </p>

            {/* Booking Reference */}
            <div className="bg-blue-50 rounded-lg p-4 mb-8">
              <p className="text-sm text-gray-600 mb-1">Booking Reference</p>
              <p className="text-2xl font-bold text-blue-600">{bookingId || 'IC-XXXXXX'}</p>
            </div>

            {/* What Happens Next */}
            <div className="text-left bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="font-semibold text-gray-900 mb-4">What Happens Next?</h2>
              <ol className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex-shrink-0">1</span>
                  <div>
                    <p className="font-medium">Confirmation Email</p>
                    <p className="text-sm text-gray-600">You&apos;ll receive a confirmation email with your booking details shortly.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex-shrink-0">2</span>
                  <div>
                    <p className="font-medium">We&apos;ll Review & Confirm</p>
                    <p className="text-sm text-gray-600">Our team will review your booking and confirm availability within 24 hours.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex-shrink-0">3</span>
                  <div>
                    <p className="font-medium">Day of Service</p>
                    <p className="text-sm text-gray-600">Our cleaning team will arrive at the scheduled time to make your space sparkle!</p>
                  </div>
                </li>
              </ol>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book">
                <Button>
                  Book Another Cleaning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline">
                  Return to Home
                </Button>
              </Link>
            </div>

            {/* Contact Info */}
            <div className="mt-8 pt-6 border-t text-sm text-gray-600">
              <p>Have questions about your booking?</p>
              <p>
                Contact us at{" "}
                <a href="tel:+233552486384" className="text-blue-600 hover:underline">(+233) 55 248 6384</a>
                {" "}or{" "}
                <a href="mailto:support@instacleaning.com" className="text-blue-600 hover:underline">support@instacleaning.com</a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  )
}

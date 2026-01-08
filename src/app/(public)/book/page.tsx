"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Home, 
  Building2, 
  Church, 
  PartyPopper, 
  UtensilsCrossed,
  Warehouse,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Calendar,
  MapPin,
  MessageSquare,
  Sparkles
} from "lucide-react"
import { timeSlots, formatPrice } from "@/lib/utils"

type ApiService = {
  id: string
  name: string
  description: string
  basePrice: number
  duration: number
}

type ApiPropertyType = {
  id: string
  name: string
  description?: string | null
}

function getPropertyTypeIcon(name: string) {
  const key = name.toLowerCase()
  if (key.includes("house") || key.includes("home") || key.includes("residential")) return Home
  if (key.includes("office") || key.includes("commercial")) return Building2
  if (key.includes("church") || key.includes("relig")) return Church
  if (key.includes("event") || key.includes("venue")) return PartyPopper
  if (key.includes("restaurant") || key.includes("kitchen")) return UtensilsCrossed
  if (key.includes("warehouse") || key.includes("industrial")) return Warehouse
  return Home
}

const propertySizes = [
  "Studio / 1 Bedroom",
  "2 Bedrooms",
  "3 Bedrooms",
  "4+ Bedrooms",
  "Small (< 1,500 sq ft)",
  "Medium (1,500-3,000 sq ft)",
  "Large (3,000+ sq ft)",
]

interface BookingData {
  serviceId: string
  propertyTypeId: string
  propertySize: string
  scheduledDate: string
  scheduledTime: string
  address: string
  city: string
  state: string
  specialInstructions: string
  contactMethod: string
  guestName: string
  guestEmail: string
  guestPhone: string
}

const initialData: BookingData = {
  serviceId: "",
  propertyTypeId: "",
  propertySize: "",
  scheduledDate: "",
  scheduledTime: "",
  address: "",
  city: "",
  state: "",
  specialInstructions: "",
  contactMethod: "EMAIL",
  guestName: "",
  guestEmail: "",
  guestPhone: "",
}

export default function BookingPage() {
  const router = useRouter()
  const isAuthenticated = false
  const [step, setStep] = useState(1)
  const [data, setData] = useState<BookingData>(initialData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [services, setServices] = useState<ApiService[]>([])
  const [propertyTypes, setPropertyTypes] = useState<ApiPropertyType[]>([])
  const [catalogLoading, setCatalogLoading] = useState(true)
  
  const totalSteps = 5

  const updateData = (field: keyof BookingData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const selectedService = useMemo(
    () => services.find((s) => s.id === data.serviceId),
    [services, data.serviceId]
  )
  const selectedPropertyType = useMemo(
    () => propertyTypes.find((p) => p.id === data.propertyTypeId),
    [propertyTypes, data.propertyTypeId]
  )

  useEffect(() => {
    let cancelled = false
    async function loadCatalog() {
      try {
        setCatalogLoading(true)
        const [servicesRes, propertyTypesRes] = await Promise.all([
          fetch("/api/services"),
          fetch("/api/property-types"),
        ])

        if (!servicesRes.ok) throw new Error("Failed to load services")
        if (!propertyTypesRes.ok) throw new Error("Failed to load property types")

        const [servicesData, propertyTypesData] = await Promise.all([
          servicesRes.json(),
          propertyTypesRes.json(),
        ])

        if (!cancelled) {
          setServices(servicesData)
          setPropertyTypes(propertyTypesData)
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load booking options")
      } finally {
        if (!cancelled) setCatalogLoading(false)
      }
    }

    loadCatalog()
    return () => {
      cancelled = true
    }
  }, [])

  // Get minimum date (tomorrow)
  const minDate = new Date()
  minDate.setDate(minDate.getDate() + 1)
  const minDateStr = minDate.toISOString().split('T')[0]

  const canProceed = () => {
    switch (step) {
      case 1:
        return data.serviceId !== ""
      case 2:
        return data.propertyTypeId !== ""
      case 3:
        return data.scheduledDate !== "" && data.scheduledTime !== ""
      case 4:
        return data.address !== "" && data.city !== "" && data.state !== ""
      case 5:
        return data.guestName.trim() !== "" && data.guestPhone.trim() !== ""
      default:
        return false
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError("")
    
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          estimatedPrice: selectedService?.basePrice || 0,
        }),
      })

      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.error || "Failed to create booking")
      }

      const booking = await response.json()
      router.push(`/book/confirmation?id=${booking.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            {[
              { num: 1, label: "Service", icon: Sparkles },
              { num: 2, label: "Property", icon: Home },
              { num: 3, label: "Schedule", icon: Calendar },
              { num: 4, label: "Address", icon: MapPin },
              { num: 5, label: "Details", icon: MessageSquare },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center">
                <div 
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    step >= s.num ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step > s.num ? <CheckCircle className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
                </div>
                <span className={`ml-2 text-sm hidden sm:inline ${step >= s.num ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                  {s.label}
                </span>
                {i < 4 && (
                  <div className={`w-8 sm:w-16 h-1 mx-2 ${step > s.num ? 'bg-blue-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>
              {step === 1 && "Select a Service"}
              {step === 2 && "What type of property?"}
              {step === 3 && "Choose Date & Time"}
              {step === 4 && "Enter Your Address"}
              {step === 5 && "Additional Details"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Choose the cleaning service that best fits your needs"}
              {step === 2 && "Tell us about the property you want cleaned"}
              {step === 3 && "Select your preferred date and time slot"}
              {step === 4 && "Where should we send our cleaning team?"}
              {step === 5 && "Any special instructions or preferences?"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {catalogLoading && step <= 2 && (
              <div className="mb-6 p-4 bg-blue-50 text-blue-700 rounded-lg">
                Loading services and property types...
              </div>
            )}
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            {/* Step 1: Service Selection */}
            {step === 1 && (
              <div className="grid gap-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      data.serviceId === service.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => updateData('serviceId', service.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{service.name}</h3>
                        <p className="text-sm text-gray-600">{service.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Duration: ~{Math.floor(service.duration / 60)}h {service.duration % 60 > 0 ? `${service.duration % 60}m` : ''}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-blue-600">{formatPrice(service.basePrice)}</p>
                        <p className="text-xs text-gray-500">starting price</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 2: Property Type */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {propertyTypes.map((type) => {
                    const Icon = getPropertyTypeIcon(type.name)
                    return (
                      <div
                        key={type.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all text-center ${
                          data.propertyTypeId === type.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                        onClick={() => updateData('propertyTypeId', type.id)}
                      >
                        <Icon className={`h-8 w-8 mx-auto mb-2 ${data.propertyTypeId === type.id ? 'text-blue-600' : 'text-gray-500'}`} />
                        <p className="font-medium text-sm">{type.name}</p>
                      </div>
                    )
                  })}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Size (Optional)
                  </label>
                  <Select
                    value={data.propertySize}
                    onChange={(e) => updateData('propertySize', e.target.value)}
                  >
                    <option value="">Select size...</option>
                    {propertySizes.map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </Select>
                </div>
              </div>
            )}

            {/* Step 3: Date & Time */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Date *
                  </label>
                  <Input
                    type="date"
                    min={minDateStr}
                    value={data.scheduledDate}
                    onChange={(e) => updateData('scheduledDate', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time *
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        className={`p-2 text-sm border rounded-lg transition-all ${
                          data.scheduledTime === time
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                        onClick={() => updateData('scheduledTime', time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Address */}
            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address *
                  </label>
                  <Input
                    placeholder="123 Main Street"
                    value={data.address}
                    onChange={(e) => updateData('address', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <Input
                      placeholder="City"
                      value={data.city}
                      onChange={(e) => updateData('city', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <Input
                      placeholder="State"
                      value={data.state}
                      onChange={(e) => updateData('state', e.target.value)}
                    />
                  </div>
                </div>

              </div>
            )}

            {/* Step 5: Additional Details */}
            {step === 5 && (
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 text-blue-700 rounded-lg text-sm">
                  You are booking as a guest. Please provide your contact details below. Admin?{" "}
                  <Link href="/login" className="underline hover:text-blue-800">Log in</Link>.
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <Input
                      placeholder="Your name"
                      value={data.guestName}
                      onChange={(e) => updateData("guestName", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <Input
                      type="tel"
                      placeholder="(+233) 55 248 6384"
                      value={data.guestPhone}
                      onChange={(e) => updateData("guestPhone", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email (Optional)
                    </label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={data.guestEmail}
                      onChange={(e) => updateData("guestEmail", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Instructions (Optional)
                  </label>
                  <Textarea
                    rows={4}
                    placeholder="Any special requests, areas to focus on, or instructions for our team..."
                    value={data.specialInstructions}
                    onChange={(e) => updateData('specialInstructions', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Contact Method
                  </label>
                  <div className="flex gap-4">
                    {[
                      { value: "EMAIL", label: "Email" },
                      { value: "SMS", label: "SMS" },
                      { value: "WHATSAPP", label: "WhatsApp" },
                    ].map((method) => (
                      <label key={method.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="contactMethod"
                          value={method.value}
                          checked={data.contactMethod === method.value}
                          onChange={(e) => updateData('contactMethod', e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm">{method.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Booking Summary */}
                <div className="bg-gray-50 rounded-lg p-4 mt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-medium">{selectedService?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Type:</span>
                      <span className="font-medium">{selectedPropertyType?.name}</span>
                    </div>
                    {data.propertySize && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Property Size:</span>
                        <span className="font-medium">{data.propertySize}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{data.scheduledDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{data.scheduledTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium text-right">{data.address}, {data.city}, {data.state}</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="font-semibold">Estimated Price:</span>
                        <span className="font-bold text-blue-600">{formatPrice(selectedService?.basePrice || 0)}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Final price may vary based on actual conditions</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setStep(prev => prev - 1)}
                disabled={step === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>

              {step < totalSteps ? (
                <Button
                  onClick={() => setStep(prev => prev + 1)}
                  disabled={!canProceed()}
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Confirm Booking"}
                  <CheckCircle className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

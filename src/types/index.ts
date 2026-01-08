export interface Service {
  id: string
  name: string
  description: string
  basePrice: number
  priceUnit: string
  duration: number
  image?: string
  isActive: boolean
}

export interface PropertyType {
  id: string
  name: string
  description?: string
  icon?: string
  isActive: boolean
}

export interface Booking {
  id: string
  bookingNumber: string
  userId?: string
  guestName?: string
  guestEmail?: string
  guestPhone?: string
  serviceId: string
  propertyTypeId: string
  propertySize?: string
  scheduledDate: Date
  scheduledTime: string
  estimatedDuration: number
  address: string
  city: string
  state: string
  zipCode?: string
  specialInstructions?: string
  estimatedPrice: number
  finalPrice?: number
  status: BookingStatus
  assignedStaffId?: string
  contactMethod: ContactMethod
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
  service?: Service
  propertyType?: PropertyType
  user?: User
  assignedStaff?: User
}

export interface User {
  id: string
  name?: string
  email: string
  phone?: string
  role: UserRole
  image?: string
  createdAt: Date
}

export type BookingStatus = "PENDING" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
export type ContactMethod = "EMAIL" | "SMS" | "WHATSAPP"
export type UserRole = "CUSTOMER" | "ADMIN" | "STAFF"

export interface BookingFormData {
  serviceId: string
  propertyTypeId: string
  propertySize?: string
  scheduledDate: string
  scheduledTime: string
  address: string
  city: string
  state: string
  zipCode?: string
  specialInstructions?: string
  contactMethod: ContactMethod
  guestName?: string
  guestEmail?: string
  guestPhone?: string
}

export interface DashboardStats {
  totalBookings: number
  pendingBookings: number
  completedBookings: number
  totalRevenue: number
  todayBookings: number
  weeklyBookings: number
}

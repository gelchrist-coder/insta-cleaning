import { z } from "zod"

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
})

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export const bookingSchema = z.object({
  serviceId: z.string().min(1, "Please select a service"),
  propertyTypeId: z.string().min(1, "Please select a property type"),
  propertySize: z.string().optional(),
  scheduledDate: z.string().min(1, "Please select a date"),
  scheduledTime: z.string().min(1, "Please select a time"),
  address: z.string().min(5, "Please enter your address"),
  city: z.string().min(2, "Please enter your city"),
  state: z.string().min(2, "Please enter your state"),
  zipCode: z.string().optional(),
  guestName: z.string().optional(),
  guestEmail: z.union([z.string().email("Invalid email address"), z.literal("")]).optional(),
  guestPhone: z.string().min(7, "Please enter your phone number"),
  specialInstructions: z.string().optional(),
  contactMethod: z.enum(["EMAIL", "SMS", "WHATSAPP"]).default("EMAIL"),
})

export const serviceSchema = z.object({
  name: z.string().min(2, "Service name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  basePrice: z.number().min(0, "Price must be positive"),
  priceUnit: z.string().default("per hour"),
  duration: z.number().min(15, "Duration must be at least 15 minutes"),
  image: z.string().optional(),
  isActive: z.boolean().default(true),
})

export const updateBookingStatusSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]),
  assignedStaffId: z.string().optional(),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type BookingInput = z.infer<typeof bookingSchema>
export type ServiceInput = z.infer<typeof serviceSchema>
export type UpdateBookingStatusInput = z.infer<typeof updateBookingStatusSchema>

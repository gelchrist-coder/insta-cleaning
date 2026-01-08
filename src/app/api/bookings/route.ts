import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { bookingSchema } from "@/lib/validations"
import { generateBookingNumber } from "@/lib/utils"

// GET /api/bookings - Get all bookings (filtered by user role)
export async function GET(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const limit = searchParams.get("limit")

    let whereClause: Record<string, unknown> = {}

    // Regular customers can only see their own bookings
    if (session.user.role === "CUSTOMER") {
      whereClause.userId = session.user.id
    }

    // Staff can see their assigned bookings
    if (session.user.role === "STAFF") {
      whereClause.assignedStaffId = session.user.id
    }

    // Filter by status if provided
    if (status) {
      whereClause.status = status
    }

    const bookings = await prisma.booking.findMany({
      where: whereClause,
      include: {
        service: true,
        propertyType: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        assignedStaff: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit ? parseInt(limit) : undefined,
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    )
  }
}

// POST /api/bookings - Create a new booking
export async function POST(request: Request) {
  try {
    const session = await auth()
    const userId = typeof session?.user?.id === "string" ? session.user.id : undefined
    const body = await request.json()

    // Validate input
    const result = bookingSchema.safeParse(body)
    if (!result.success) {
      const issues = result.error.issues
      return NextResponse.json(
        { error: issues[0]?.message || "Validation failed" },
        { status: 400 }
      )
    }

    const data = result.data

    const isAuthenticated = Boolean(userId)
    if (!data.guestName || data.guestName.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your name" },
        { status: 400 }
      )
    }
    if (!data.guestPhone || data.guestPhone.trim().length < 7) {
      return NextResponse.json(
        { error: "Please enter your phone number" },
        { status: 400 }
      )
    }

    const guestEmail = data.guestEmail && data.guestEmail.trim() !== "" ? data.guestEmail.trim() : null
    const guestPhone = data.guestPhone.trim()

    // Verify service and property type exist
    const service = await prisma.service.findUnique({
      where: { id: data.serviceId },
    })

    const propertyType = await prisma.propertyType.findUnique({
      where: { id: data.propertyTypeId },
    })

    if (!service) {
      return NextResponse.json(
        { error: "Invalid service selected" },
        { status: 400 }
      )
    }

    if (!propertyType) {
      return NextResponse.json(
        { error: "Invalid property type selected" },
        { status: 400 }
      )
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        bookingNumber: generateBookingNumber(),
        user: userId ? { connect: { id: userId } } : undefined,
        guestName: data.guestName.trim(),
        guestEmail,
        guestPhone,
        service: { connect: { id: data.serviceId } },
        propertyType: { connect: { id: data.propertyTypeId } },
        propertySize: data.propertySize,
        scheduledDate: new Date(data.scheduledDate),
        scheduledTime: data.scheduledTime,
        estimatedDuration: service.duration,
        address: data.address,
        city: data.city,
        state: data.state,
        ...(data.zipCode ? { zipCode: data.zipCode } : {}),
        specialInstructions: data.specialInstructions,
        estimatedPrice: body.estimatedPrice || service.basePrice,
        status: "PENDING",
        contactMethod: data.contactMethod,
      },
      include: {
        service: true,
        propertyType: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    })

    // TODO: Send confirmation email/SMS/WhatsApp

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    )
  }
}

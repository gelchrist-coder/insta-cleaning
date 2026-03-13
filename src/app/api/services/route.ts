import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { serviceSchema } from "@/lib/validations"
import { Prisma } from "@prisma/client"

const fallbackServices = [
  {
    id: "standard-cleaning",
    name: "Standard Cleaning",
    description: "Regular cleaning service for homes and offices.",
    basePrice: 99,
    duration: 120,
  },
  {
    id: "deep-cleaning",
    name: "Deep Cleaning",
    description: "Top-to-bottom detailed cleaning for a deeper reset.",
    basePrice: 199,
    duration: 240,
  },
  {
    id: "move-in-out",
    name: "Move In/Out Cleaning",
    description: "Comprehensive cleaning for empty or newly occupied spaces.",
    basePrice: 299,
    duration: 360,
  },
  {
    id: "office-cleaning",
    name: "Office Cleaning",
    description: "Professional cleaning tailored to office and commercial spaces.",
    basePrice: 149,
    duration: 180,
  },
]

// GET /api/services - Get all services
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    })

    return NextResponse.json(services)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2022") {
      // Backward-compatible fallback for databases missing the isActive column.
      const services = await prisma.service.findMany({
        orderBy: { name: "asc" },
      })
      return NextResponse.json(services)
    }

    console.error("Error fetching services, serving fallback data:", error)
    return NextResponse.json(fallbackServices)
  }
}

// POST /api/services - Create a new service (admin only)
export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      )
    }

    const body = await request.json()

    // Validate input
    const result = serviceSchema.safeParse(body)
    if (!result.success) {
      const issues = result.error.issues
      return NextResponse.json(
        { error: issues[0]?.message || "Validation failed" },
        { status: 400 }
      )
    }

    const service = await prisma.service.create({
      data: result.data,
    })

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    console.error("Error creating service:", error)
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    )
  }
}

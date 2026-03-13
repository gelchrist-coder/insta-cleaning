import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

const fallbackPropertyTypes = [
  { id: "house", name: "House", description: "Single-family home" },
  { id: "apartment-condo", name: "Apartment/Condo", description: "Apartment or condominium unit" },
  { id: "office", name: "Office", description: "Commercial office space" },
  { id: "church", name: "Church", description: "Church or place of worship" },
  { id: "restaurant", name: "Restaurant", description: "Restaurant or food service establishment" },
  { id: "event-venue", name: "Event Venue", description: "Event space or banquet hall" },
  { id: "retail-store", name: "Retail Store", description: "Retail or shop space" },
]

// GET /api/property-types - Get all property types
export async function GET() {
  try {
    const propertyTypes = await prisma.propertyType.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    })

    return NextResponse.json(propertyTypes)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2022") {
      // Backward-compatible fallback for databases missing the isActive column.
      const propertyTypes = await prisma.propertyType.findMany({
        orderBy: { name: "asc" },
      })
      return NextResponse.json(propertyTypes)
    }

    console.error("Error fetching property types, serving fallback data:", error)
    return NextResponse.json(fallbackPropertyTypes)
  }
}

import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

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

    console.error("Error fetching property types:", error)
    return NextResponse.json(
      { error: "Failed to fetch property types" },
      { status: 500 }
    )
  }
}

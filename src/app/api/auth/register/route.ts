import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { Prisma } from "@prisma/client"
import prisma from "@/lib/prisma"
import { registerSchema } from "@/lib/validations"

async function createUserWithSchemaFallback(input: {
  name: string
  email: string
  hashedPassword: string
  phone?: string
}) {
  try {
    await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: input.hashedPassword,
        phone: input.phone || null,
        role: "CUSTOMER",
      },
      select: { id: true },
    })
    return
  } catch (error) {
    // Backward-compatible fallback for production DBs missing newer optional columns.
    if (!(error instanceof Prisma.PrismaClientKnownRequestError) || error.code !== "P2022") {
      throw error
    }

    const column = String((error.meta as { column?: string } | undefined)?.column || "").toLowerCase()

    if (column.includes("phone")) {
      await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: input.hashedPassword,
          role: "CUSTOMER",
        },
        select: { id: true },
      })
      return
    }

    if (column.includes("role")) {
      await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: input.hashedPassword,
          ...(input.phone ? { phone: input.phone } : {}),
        },
        select: { id: true },
      })
      return
    }

    throw error
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = registerSchema.safeParse(body)

    if (!result.success) {
      const issues = result.error.issues
      return NextResponse.json(
        { error: issues[0]?.message || "Validation failed" },
        { status: 400 }
      )
    }

    const { name, email, password, phone } = result.data

    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      )
    }

    const hashedPassword = await hash(password, 12)

    await createUserWithSchemaFallback({
      name,
      email,
      hashedPassword,
      phone,
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid request payload" },
        { status: 400 }
      )
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "An account with this email already exists" },
          { status: 409 }
        )
      }

      if (error.code === "P2022") {
        return NextResponse.json(
          { error: "Registration is temporarily unavailable due to database schema mismatch. Please contact support." },
          { status: 503 }
        )
      }
    }

    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Unable to create account right now. Please try again." },
      { status: 503 }
    )
  }
}

import { NextResponse } from "next/server"

export async function POST() {
  return NextResponse.json(
    { error: "Registration is disabled. Please book as a guest." },
    { status: 404 }
  )
}

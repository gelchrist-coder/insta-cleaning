"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  // Guest-only customer experience: no customer accounts/dashboard
  useEffect(() => {
    router.replace("/book")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      <span className="sr-only">Redirecting…</span>
    </div>
  )
}

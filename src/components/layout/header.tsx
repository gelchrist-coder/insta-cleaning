"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { signOut, useSession } from "next-auth/react"
import { Menu, X, Phone, Mail, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { status, data: session } = useSession()
  const isAdmin = status === "authenticated" && session?.user?.role === "ADMIN"

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-blue-600 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:+233552486384" className="flex items-center gap-1 hover:text-blue-200">
              <Phone className="h-4 w-4" />
              <span>(+233) 55 248 6384</span>
            </a>
            <a href="mailto:info@instacleaning.com" className="hidden sm:flex items-center gap-1 hover:text-blue-200">
              <Mail className="h-4 w-4" />
              <span>info@instacleaning.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            {isAdmin ? (
              <>
                <Link href="/admin/dashboard" className="hover:text-blue-200">Dashboard</Link>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="hover:text-blue-200"
                >
                  Logout
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
      
      {/* Main navigation */}
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Insta-Cleaning</span>
          </Link>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-blue-600",
                  pathname === item.href ? "text-blue-600" : "text-gray-700"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* Book Now button */}
          <div className="hidden md:block">
            <Link href="/book">
              <Button>Book Now</Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-blue-600",
                    pathname === item.href ? "text-blue-600" : "text-gray-700"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link href="/book" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">Book Now</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

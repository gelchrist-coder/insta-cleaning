import Link from "next/link"
import { Sparkles, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold text-white">Insta-Cleaning</span>
            </div>
            <p className="text-sm">
              Professional cleaning services for homes, offices, churches, events, and more. 
              We make your space shine!
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-blue-500 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-blue-500 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-blue-500 transition-colors">Services</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-500 transition-colors">Pricing</Link></li>
              <li><Link href="/book" className="hover:text-blue-500 transition-colors">Book Now</Link></li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services#residential" className="hover:text-blue-500 transition-colors">Residential Cleaning</Link></li>
              <li><Link href="/services#commercial" className="hover:text-blue-500 transition-colors">Commercial Cleaning</Link></li>
              <li><Link href="/services#deep" className="hover:text-blue-500 transition-colors">Deep Cleaning</Link></li>
              <li><Link href="/services#event" className="hover:text-blue-500 transition-colors">Event Cleaning</Link></li>
              <li><Link href="/services#move" className="hover:text-blue-500 transition-colors">Move In/Out Cleaning</Link></li>
            </ul>
          </div>
          
          {/* Contact info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>123 Cleaning Street<br />City, State</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <a href="tel:+233552486384" className="hover:text-blue-500 transition-colors">(+233) 55 248 6384</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a href="mailto:info@instacleaning.com" className="hover:text-blue-500 transition-colors">info@instacleaning.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Insta-Cleaning. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

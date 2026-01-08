import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Sparkles, 
  Home, 
  Building2, 
  Church, 
  PartyPopper, 
  UtensilsCrossed,
  CheckCircle,
  Star,
  Clock,
  Shield,
  ArrowRight
} from "lucide-react"

const services = [
  { icon: Home, name: "Residential Cleaning", description: "Complete home cleaning services" },
  { icon: Building2, name: "Office Cleaning", description: "Professional workspace cleaning" },
  { icon: Church, name: "Church Cleaning", description: "Respectful religious space cleaning" },
  { icon: PartyPopper, name: "Event Cleaning", description: "Pre and post-event cleaning" },
  { icon: UtensilsCrossed, name: "Restaurant Cleaning", description: "Deep kitchen and dining cleaning" },
]

const benefits = [
  { icon: CheckCircle, title: "Quality Guaranteed", description: "100% satisfaction or we re-clean for free" },
  { icon: Star, title: "Experienced Team", description: "Trained and vetted cleaning professionals" },
  { icon: Clock, title: "Flexible Scheduling", description: "Book at your convenience, any day" },
  { icon: Shield, title: "Fully Insured", description: "Your property is protected" },
]

const testimonials = [
  { name: "Sarah M.", role: "Homeowner", content: "Insta-Cleaning transformed my home! The team was professional, thorough, and my house has never looked better." },
  { name: "John D.", role: "Office Manager", content: "We've been using their office cleaning service for 6 months. Consistently excellent work and reliable service." },
  { name: "Pastor Williams", role: "Church Administrator", content: "They treat our church with respect and care. The congregation always comments on how clean everything is." },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Professional Cleaning Services You Can Trust
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-blue-100">
              From homes to offices, churches to events — we make every space sparkle. 
              Book your cleaning service today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto">
                  Book Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700 w-full sm:w-auto">
                  View Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 opacity-10">
          <Sparkles className="h-96 w-96" />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Cleaning Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer a wide range of professional cleaning services tailored to your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.name} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <service.icon className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link href="/services" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/services">
              <Button variant="outline" size="lg">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Insta-Cleaning?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We&apos;re committed to delivering exceptional cleaning services every time
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                  <benefit.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 lg:py-24 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Booking your cleaning service is easy and quick
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Choose Service", desc: "Select the type of cleaning you need" },
              { step: "2", title: "Pick Date & Time", desc: "Choose a convenient time slot" },
              { step: "3", title: "Enter Details", desc: "Provide your address and instructions" },
              { step: "4", title: "Confirm Booking", desc: "Receive instant confirmation" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-blue-600 font-bold text-xl mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-blue-100">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/book">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Book Your Cleaning Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don&apos;t just take our word for it — hear from our satisfied customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name}>
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">&quot;{testimonial.content}&quot;</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Book your professional cleaning service today and experience the Insta-Cleaning difference.
          </p>
          <Link href="/book">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Book Your Cleaning
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

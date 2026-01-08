import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Home, 
  Building2, 
  Church, 
  PartyPopper, 
  UtensilsCrossed,
  Warehouse,
  CheckCircle,
  ArrowRight,
  Sparkles
} from "lucide-react"

const services = [
  {
    id: "residential",
    icon: Home,
    name: "Residential Cleaning",
    description: "Complete home cleaning services tailored to your needs",
    features: [
      "Regular house cleaning",
      "Deep cleaning",
      "Move in/out cleaning",
      "Spring cleaning",
      "Post-renovation cleaning",
    ],
    startingPrice: "GH₵99",
  },
  {
    id: "commercial",
    icon: Building2,
    name: "Office & Commercial Cleaning",
    description: "Keep your workplace clean, healthy, and professional",
    features: [
      "Daily office cleaning",
      "Floor care and maintenance",
      "Restroom sanitation",
      "Break room cleaning",
      "Window cleaning",
    ],
    startingPrice: "GH₵149",
  },
  {
    id: "church",
    icon: Church,
    name: "Church & Religious Facility Cleaning",
    description: "Respectful and thorough cleaning for places of worship",
    features: [
      "Sanctuary and pew cleaning",
      "Fellowship hall maintenance",
      "Restroom sanitation",
      "Floor care",
      "Pre/post event cleaning",
    ],
    startingPrice: "GH₵199",
  },
  {
    id: "event",
    icon: PartyPopper,
    name: "Event Cleaning",
    description: "Pre and post-event cleaning for any occasion",
    features: [
      "Pre-event setup cleaning",
      "Post-event cleanup",
      "Venue restoration",
      "Trash removal",
      "Floor and surface cleaning",
    ],
    startingPrice: "GH₵249",
  },
  {
    id: "restaurant",
    icon: UtensilsCrossed,
    name: "Restaurant & Kitchen Cleaning",
    description: "Deep cleaning services meeting health standards",
    features: [
      "Kitchen deep cleaning",
      "Hood and vent cleaning",
      "Dining area maintenance",
      "Floor degreasing",
      "Equipment cleaning",
    ],
    startingPrice: "GH₵299",
  },
  {
    id: "industrial",
    icon: Warehouse,
    name: "Industrial & Warehouse Cleaning",
    description: "Large-scale cleaning for industrial facilities",
    features: [
      "Warehouse floor cleaning",
      "High dusting",
      "Pressure washing",
      "Equipment cleaning",
      "Loading dock cleaning",
    ],
    startingPrice: "GH₵399",
  },
]

const additionalServices = [
  "Carpet cleaning and shampooing",
  "Upholstery cleaning",
  "Window cleaning (interior/exterior)",
  "Pressure washing",
  "Disinfection and sanitization",
  "Organizing services",
]

export default function ServicesPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Our Cleaning Services</h1>
            <p className="text-xl text-blue-100">
              From homes to businesses, we offer comprehensive cleaning solutions 
              tailored to your specific needs. Professional, reliable, and thorough.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.id} id={service.id} className="flex flex-col">
                <CardHeader>
                  <div className="w-14 h-14 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <service.icon className="h-7 w-7 text-blue-600" />
                  </div>
                  <CardTitle>{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-500">Starting from</p>
                    <p className="text-2xl font-bold text-blue-600">{service.startingPrice}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Additional Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We also offer these specialized cleaning services to meet all your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {additionalServices.map((service) => (
              <div key={service} className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                <Sparkles className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Cleaning Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We follow a systematic approach to ensure consistent, high-quality results
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Assessment", desc: "We evaluate your space and understand your specific requirements" },
              { step: "2", title: "Planning", desc: "Create a customized cleaning plan tailored to your needs" },
              { step: "3", title: "Execution", desc: "Our trained team performs thorough cleaning with attention to detail" },
              { step: "4", title: "Quality Check", desc: "Final inspection to ensure everything meets our high standards" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Book Your Cleaning?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Get a free quote or book your cleaning service online in just a few minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto">
                Book Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700 w-full sm:w-auto">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

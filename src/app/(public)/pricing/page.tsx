import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle, ArrowRight, HelpCircle } from "lucide-react"

const pricingPlans = [
  {
    name: "Basic Clean",
    description: "Perfect for regular maintenance cleaning",
    price: "GH₵99",
    priceNote: "Starting price",
    features: [
      "Dusting all surfaces",
      "Vacuuming and mopping floors",
      "Kitchen counters and appliances (exterior)",
      "Bathroom cleaning",
      "Trash removal",
      "Bed making",
    ],
    popular: false,
  },
  {
    name: "Deep Clean",
    description: "Thorough cleaning for a fresh start",
    price: "GH₵199",
    priceNote: "Starting price",
    features: [
      "Everything in Basic Clean",
      "Inside appliances (oven, fridge)",
      "Baseboards and door frames",
      "Light fixtures and ceiling fans",
      "Window sills and tracks",
      "Cabinet exteriors",
      "Detailed bathroom scrubbing",
    ],
    popular: true,
  },
  {
    name: "Move In/Out",
    description: "Complete cleaning for moving day",
    price: "GH₵299",
    priceNote: "Starting price",
    features: [
      "Everything in Deep Clean",
      "Inside all cabinets and drawers",
      "Inside closets",
      "Wall spot cleaning",
      "Switch plates and outlets",
      "Garage sweeping (if applicable)",
      "Detailed window cleaning",
    ],
    popular: false,
  },
]

const propertyPricing = [
  { type: "Studio / 1 Bedroom", basic: "GH₵99", deep: "GH₵149", moveInOut: "GH₵199" },
  { type: "2 Bedroom", basic: "GH₵129", deep: "GH₵199", moveInOut: "GH₵279" },
  { type: "3 Bedroom", basic: "GH₵159", deep: "GH₵249", moveInOut: "GH₵349" },
  { type: "4+ Bedroom", basic: "GH₵199+", deep: "GH₵299+", moveInOut: "GH₵449+" },
]

const commercialPricing = [
  { type: "Small Office (up to 1,500 sq ft)", price: "GH₵149+" },
  { type: "Medium Office (1,500-3,000 sq ft)", price: "GH₵249+" },
  { type: "Large Office (3,000+ sq ft)", price: "GH₵399+" },
  { type: "Church/Religious Facility", price: "GH₵199+" },
  { type: "Restaurant/Kitchen", price: "GH₵299+" },
  { type: "Event Venue (per event)", price: "GH₵249+" },
]

const faqs = [
  {
    question: "How is pricing calculated?",
    answer: "Our pricing is based on the size of your space, type of cleaning required, and any special requests. We provide transparent quotes before any service."
  },
  {
    question: "Do you offer recurring discounts?",
    answer: "Yes! Weekly cleanings receive 20% off, bi-weekly cleanings receive 15% off, and monthly cleanings receive 10% off our regular rates."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, and digital payments. Payment is collected after the service is completed."
  },
  {
    question: "Is there a cancellation fee?",
    answer: "Cancellations made 24+ hours in advance are free. Cancellations within 24 hours may incur a fee of up to 50% of the service cost."
  },
  {
    question: "Do you bring your own supplies?",
    answer: "Yes, we bring all necessary cleaning supplies and equipment. If you prefer we use your products, just let us know when booking."
  },
]

export default function PricingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Transparent Pricing</h1>
            <p className="text-xl text-blue-100">
              Clear, upfront pricing with no hidden fees. Get the cleaning you need 
              at a price that works for you.
            </p>
          </div>
        </div>
      </section>

      {/* Residential Pricing Plans */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Residential Cleaning</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the cleaning package that best fits your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card key={plan.name} className={`relative ${plan.popular ? 'border-blue-600 border-2' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 text-sm ml-1">{plan.priceNote}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/book" className="block">
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      Book Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Property Size Pricing */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Pricing by Property Size</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Estimated pricing based on your home size
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Property Size</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Basic Clean</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Deep Clean</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Move In/Out</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {propertyPricing.map((row) => (
                    <tr key={row.type}>
                      <td className="px-6 py-4 text-sm text-gray-900">{row.type}</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">{row.basic}</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">{row.deep}</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">{row.moveInOut}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 text-center mt-4">
              * Prices may vary based on condition, location, and specific requirements
            </p>
          </div>
        </div>
      </section>

      {/* Commercial Pricing */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Commercial Cleaning</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Competitive rates for businesses and organizations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {commercialPricing.map((item) => (
              <Card key={item.type}>
                <CardContent className="p-6">
                  <p className="font-medium text-gray-900 mb-2">{item.type}</p>
                  <p className="text-2xl font-bold text-blue-600">{item.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-sm text-gray-500 text-center mt-6">
            Contact us for a customized quote based on your specific needs
          </p>
        </div>
      </section>

      {/* Recurring Discounts */}
      <section className="py-16 lg:py-24 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Save with Recurring Service</h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Book regular cleanings and enjoy exclusive discounts
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { frequency: "Weekly", discount: "20% OFF", savings: "Maximum savings" },
              { frequency: "Bi-Weekly", discount: "15% OFF", savings: "Great value" },
              { frequency: "Monthly", discount: "10% OFF", savings: "Budget friendly" },
            ].map((item) => (
              <div key={item.frequency} className="bg-white/10 rounded-lg p-6 text-center">
                <p className="text-lg font-medium mb-2">{item.frequency}</p>
                <p className="text-3xl font-bold mb-2">{item.discount}</p>
                <p className="text-blue-100 text-sm">{item.savings}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Common questions about our pricing and services
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <Card key={faq.question}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-600 text-sm">{faq.answer}</p>
                    </div>
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
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Book your cleaning today and see why thousands trust Insta-Cleaning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button size="lg" className="w-full sm:w-auto">
                Book Your Cleaning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-gray-800 w-full sm:w-auto">
                Get Custom Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

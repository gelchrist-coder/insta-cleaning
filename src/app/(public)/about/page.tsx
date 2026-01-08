import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, Award, Clock, Heart, Target } from "lucide-react"

const values = [
  { icon: Heart, title: "Customer First", description: "Your satisfaction is our top priority. We go above and beyond to exceed expectations." },
  { icon: Target, title: "Attention to Detail", description: "We don't cut corners. Every surface, every corner gets the attention it deserves." },
  { icon: Award, title: "Excellence", description: "We continuously improve our services and train our team to deliver the best results." },
  { icon: Users, title: "Trust & Reliability", description: "Our team is vetted, insured, and committed to treating your space with respect." },
]

const stats = [
  { number: "5000+", label: "Happy Customers" },
  { number: "10+", label: "Years Experience" },
  { number: "50+", label: "Team Members" },
  { number: "99%", label: "Satisfaction Rate" },
]

const team = [
  { name: "Maria Johnson", role: "Founder & CEO", bio: "With over 15 years in the cleaning industry, Maria founded Insta-Cleaning to provide reliable, high-quality cleaning services." },
  { name: "David Chen", role: "Operations Manager", bio: "David ensures our cleaning teams deliver consistent excellence across all our services." },
  { name: "Lisa Williams", role: "Customer Success", bio: "Lisa leads our customer service team, ensuring every client has an exceptional experience." },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">About Insta-Cleaning</h1>
            <p className="text-xl text-blue-100">
              We&apos;re more than just a cleaning company. We&apos;re your partners in creating clean, 
              healthy, and welcoming spaces for homes and businesses.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Insta-Cleaning was founded with a simple mission: to provide professional, 
                  reliable cleaning services that people can trust. What started as a small 
                  team serving local homes has grown into a comprehensive cleaning service 
                  covering residential, commercial, and specialty cleaning needs.
                </p>
                <p>
                  We believe that a clean space is essential for health, productivity, and 
                  peace of mind. That&apos;s why we&apos;ve built a team of dedicated professionals 
                  who take pride in their work and treat every space as if it were their own.
                </p>
                <p>
                  Today, we serve thousands of satisfied customers, from busy families to 
                  growing businesses, churches, and event venues. Our commitment to quality, 
                  reliability, and customer satisfaction remains at the heart of everything we do.
                </p>
              </div>
            </div>
            <div className="relative h-80 lg:h-96 bg-gray-200 rounded-lg overflow-hidden">
              {/* Placeholder for image */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <Users className="h-16 w-16 mx-auto mb-2" />
                  <p>Team Photo Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl lg:text-5xl font-bold mb-2">{stat.number}</p>
                <p className="text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and how we serve our customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <Card key={value.title}>
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-blue-600 mb-4">
                    <value.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The dedicated people behind Insta-Cleaning&apos;s success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <Card key={member.name}>
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-blue-600 text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
              <div className="space-y-4">
                {[
                  "Trained and background-checked cleaning professionals",
                  "Eco-friendly cleaning products available",
                  "Flexible scheduling including weekends",
                  "Satisfaction guaranteed on every service",
                  "Fully licensed and insured",
                  "Consistent and reliable service",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <p className="text-gray-600">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/book">
                  <Button size="lg">Book Your Cleaning</Button>
                </Link>
              </div>
            </div>
            <div className="relative h-80 lg:h-96 bg-gray-200 rounded-lg overflow-hidden">
              {/* Placeholder for image */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <Clock className="h-16 w-16 mx-auto mb-2" />
                  <p>Service Photo Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Experience the Difference?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Insta-Cleaning for their cleaning needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto">
                Book a Cleaning
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700 w-full sm:w-auto">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

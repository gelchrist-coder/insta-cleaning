import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting database seed...")

  // Create services
  console.log("Creating services...")
  const services = await Promise.all([
    prisma.service.upsert({
      where: { id: "standard-cleaning" },
      update: {},
      create: {
        id: "standard-cleaning",
        name: "Standard Cleaning",
        description: "Our regular cleaning service includes dusting, vacuuming, mopping, bathroom cleaning, and kitchen cleaning. Perfect for weekly or bi-weekly maintenance.",
        basePrice: 99,
        duration: 120,
        priceUnit: "flat rate",
        isActive: true,
      },
    }),
    prisma.service.upsert({
      where: { id: "deep-cleaning" },
      update: {},
      create: {
        id: "deep-cleaning",
        name: "Deep Cleaning",
        description: "A thorough top-to-bottom clean including everything in standard cleaning plus inside appliances, baseboards, window sills, and detailed scrubbing.",
        basePrice: 199,
        duration: 240,
        priceUnit: "flat rate",
        isActive: true,
      },
    }),
    prisma.service.upsert({
      where: { id: "move-in-out" },
      update: {},
      create: {
        id: "move-in-out",
        name: "Move In/Out Cleaning",
        description: "Comprehensive cleaning for empty properties. Includes everything in deep cleaning plus inside cabinets, closets, and garage cleaning.",
        basePrice: 299,
        duration: 360,
        priceUnit: "flat rate",
        isActive: true,
      },
    }),
    prisma.service.upsert({
      where: { id: "office-cleaning" },
      update: {},
      create: {
        id: "office-cleaning",
        name: "Office Cleaning",
        description: "Professional cleaning for offices and commercial spaces. Includes desk cleaning, trash removal, restroom sanitization, and floor care.",
        basePrice: 149,
        duration: 180,
        priceUnit: "flat rate",
        isActive: true,
      },
    }),
    prisma.service.upsert({
      where: { id: "post-construction" },
      update: {},
      create: {
        id: "post-construction",
        name: "Post-Construction Cleaning",
        description: "Specialized cleaning after renovations or construction. Removes dust, debris, and construction materials to make your space move-in ready.",
        basePrice: 399,
        duration: 480,
        priceUnit: "flat rate",
        isActive: true,
      },
    }),
    prisma.service.upsert({
      where: { id: "event-cleaning" },
      update: {},
      create: {
        id: "event-cleaning",
        name: "Event Cleaning",
        description: "Pre and post-event cleaning services for parties, weddings, corporate events, and gatherings. Available on short notice.",
        basePrice: 249,
        duration: 240,
        priceUnit: "flat rate",
        isActive: true,
      },
    }),
  ])
  console.log(`Created ${services.length} services`)

  // Create property types
  console.log("Creating property types...")
  const propertyTypes = await Promise.all([
    prisma.propertyType.upsert({
      where: { name: "House" },
      update: {},
      create: {
        name: "House",
        description: "Single-family home",
        icon: "🏠",
      },
    }),
    prisma.propertyType.upsert({
      where: { name: "Apartment/Condo" },
      update: {},
      create: {
        name: "Apartment/Condo",
        description: "Apartment or condominium unit",
        icon: "🏢",
      },
    }),
    prisma.propertyType.upsert({
      where: { name: "Office" },
      update: {},
      create: {
        name: "Office",
        description: "Commercial office space",
        icon: "🏛️",
      },
    }),
    prisma.propertyType.upsert({
      where: { name: "Church" },
      update: {},
      create: {
        name: "Church",
        description: "Church or place of worship",
        icon: "⛪",
      },
    }),
    prisma.propertyType.upsert({
      where: { name: "Restaurant" },
      update: {},
      create: {
        name: "Restaurant",
        description: "Restaurant or food service establishment",
        icon: "🍽️",
      },
    }),
    prisma.propertyType.upsert({
      where: { name: "Event Venue" },
      update: {},
      create: {
        name: "Event Venue",
        description: "Event space or banquet hall",
        icon: "🎪",
      },
    }),
    prisma.propertyType.upsert({
      where: { name: "Retail Store" },
      update: {},
      create: {
        name: "Retail Store",
        description: "Retail or shop space",
        icon: "🛒",
      },
    }),
  ])
  console.log(`Created ${propertyTypes.length} property types`)

  // Create admin user
  console.log("Creating admin user...")
  const adminPassword = await hash("admin123", 12)
  const admin = await prisma.user.upsert({
    where: { email: "admin@instacleaning.com" },
    update: {},
    create: {
      email: "admin@instacleaning.com",
      name: "Admin User",
      password: adminPassword,
      role: "ADMIN",
      phone: "(555) 000-0000",
    },
  })
  console.log(`Created admin user: ${admin.email}`)

  // Create sample staff
  console.log("Creating sample staff...")
  const staffPassword = await hash("staff123", 12)
  const staff = await Promise.all([
    prisma.user.upsert({
      where: { email: "maria@instacleaning.com" },
      update: {},
      create: {
        email: "maria@instacleaning.com",
        name: "Maria Rodriguez",
        password: staffPassword,
        role: "STAFF",
        phone: "(555) 111-1111",
      },
    }),
    prisma.user.upsert({
      where: { email: "james@instacleaning.com" },
      update: {},
      create: {
        email: "james@instacleaning.com",
        name: "James Wilson",
        password: staffPassword,
        role: "STAFF",
        phone: "(555) 222-2222",
      },
    }),
  ])
  console.log(`Created ${staff.length} staff members`)

  console.log("✅ Database seed completed successfully!")
  console.log("\n📝 Login credentials:")
  console.log("Admin: admin@instacleaning.com / admin123")
  console.log("Staff: maria@instacleaning.com / staff123")
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e)
    process.exit(1)
  })

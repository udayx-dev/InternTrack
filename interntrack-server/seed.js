require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/User.model");
const Application = require("./src/models/Application.model");

const SEED_EMAIL = "demo@interntrack.dev";
const SEED_PASSWORD = "demo1234";

const COMPANIES = [
  { company: "Google",      role: "SDE Intern",            status: "Offer",     tags: ["tech", "product"] },
  { company: "Microsoft",   role: "Software Engineer Intern", status: "Interview", tags: ["tech", "cloud"] },
  { company: "Flipkart",    role: "Backend Intern",        status: "Interview", tags: ["ecommerce", "tech"] },
  { company: "Amazon",      role: "SDE Intern",            status: "OA",        tags: ["tech", "aws"] },
  { company: "Razorpay",    role: "Full Stack Intern",     status: "OA",        tags: ["fintech", "startup"] },
  { company: "Swiggy",      role: "Backend Engineer Intern", status: "Applied", tags: ["foodtech", "startup"] },
  { company: "Zomato",      role: "React Intern",          status: "Applied",   tags: ["foodtech", "frontend"] },
  { company: "Atlassian",   role: "SWE Intern",            status: "Applied",   tags: ["saas", "tech"] },
  { company: "Uber",        role: "Software Intern",       status: "Rejected",  tags: ["mobility", "tech"] },
  { company: "Meesho",      role: "Backend Intern",        status: "Rejected",  tags: ["ecommerce", "startup"] },
  { company: "Cred",        role: "SDE Intern",            status: "Applied",   tags: ["fintech", "startup"] },
  { company: "PhonePe",     role: "Full Stack Intern",     status: "Applied",   tags: ["fintech", "payments"] },
  { company: "Ola",         role: "SDE Intern",            status: "Applied",   tags: ["mobility", "startup"] },
  { company: "Paytm",       role: "Backend Intern",        status: "Interview", tags: ["fintech", "payments"] },
  { company: "CRED",        role: "Frontend Intern",       status: "OA",        tags: ["fintech", "frontend"] },
  { company: "Groww",       role: "SDE Intern",            status: "Applied",   tags: ["fintech", "investment"] },
  { company: "Nykaa",       role: "Backend Intern",        status: "Applied",   tags: ["ecommerce", "startup"] },
  { company: "Freshworks",  role: "Software Intern",       status: "Applied",   tags: ["saas", "tech"] },
  { company: "Postman",     role: "SDE Intern",            status: "Applied",   tags: ["devtools", "saas"] },
  { company: "Notion",      role: "Frontend Intern",       status: "Applied",   tags: ["saas", "productivity"] },
];

const HR_NAMES = ["Priya Sharma", "Rohan Verma", "Anjali Singh", "Kunal Mehta", "Sneha Patel"];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Find or create demo user
    let user = await User.findOne({ email: SEED_EMAIL });
    if (!user) {
      user = await User.create({
        name: "Demo User",
        email: SEED_EMAIL,
        password: SEED_PASSWORD, // pre-save hook hashes this
      });
      console.log("✅ Demo user created:", SEED_EMAIL, "/ password:", SEED_PASSWORD);
    } else {
      console.log("ℹ️  Demo user already exists");
    }

    // Clear existing applications for this user
    await Application.deleteMany({ userId: user._id });

    // Seed applications with realistic dates
    const applications = COMPANIES.map((app, i) => {
      const daysAgo = Math.floor(Math.random() * 30);
      const createdAt = new Date(Date.now() - daysAgo * 86400000);
      const deadline = new Date(Date.now() + (i % 3 === 0 ? -2 : 3 + i) * 86400000);

      return {
        userId: user._id,
        ...app,
        deadline,
        hrName: HR_NAMES[i % HR_NAMES.length],
        hrEmail: `hr@${app.company.toLowerCase().replace(/\s/g, "")}.com`,
        notes: `Applied via campus portal. ${app.status === "Interview" ? "Interview scheduled." : ""}`,
        location: ["Bangalore", "Mumbai", "Hyderabad", "Remote"][i % 4],
        salary: ["₹40,000/month", "₹50,000/month", "₹60,000/month", "₹80,000/month"][i % 4],
        createdAt,
        updatedAt: createdAt,
      };
    });

    await Application.insertMany(applications);
    console.log(`✅ Seeded ${applications.length} applications`);
    console.log("\n🎯 Demo credentials:");
    console.log("   Email:    demo@interntrack.dev");
    console.log("   Password: demo1234\n");

    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  }
};

seedDB();
import mongoose, { Schema } from "mongoose";
import fs from "fs";
import { DB_FILE } from "./config.js";
// --- Mongoose Schemas ---
const ProductSchema = new Schema({
    id: { type: String, required: true, unique: true, index: true },
    slug: { type: String, default: "" },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, default: "" },
    features: { type: [String], default: [] },
    specifications: [{ label: String, value: String }],
    imageUrl: { type: String }
});
const SolutionSchema = new Schema({
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    subLabel: { type: String, default: "" },
    tagline: { type: String, required: true },
    accent: { type: String, enum: ["blue", "orange"], default: "blue" },
    description: { type: String, required: true },
    detailedContent: { type: String, default: "" },
    features: { type: [String], default: [] },
    compliance: { type: [String], default: [] },
    specs: [{ label: String, value: String }],
    benefits: { type: [String], default: [] },
    applications: { type: [String], default: [] },
    imageUrl: { type: String, default: "" }
});
const ApplicationSchema = new Schema({
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    category: { type: String, default: "" },
    tagline: { type: String, required: true },
    overview: { type: String, required: true },
    accentHex: { type: String, default: "#38bdf8" },
    capabilities: [{ title: String, body: String }],
    useCases: { type: [String], default: [] },
    metrics: [{ value: String, label: String }],
    relatedSolutions: [{ name: String, href: String }]
});
const ServiceSchema = new Schema({
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    category: { type: String, default: "" },
    tagline: { type: String, required: true },
    overview: { type: String, required: true },
    accentHex: { type: String, default: "#10b981" },
    capabilities: [{ title: String, body: String }],
    deliverables: { type: [String], default: [] },
    metrics: [{ value: String, label: String }],
    relatedSolutions: [{ name: String, href: String }]
});
const AdminSchema = new Schema({
    username: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    salt: { type: String, required: true }
});
// --- Mongoose Models ---
export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export const Solution = mongoose.models.Solution || mongoose.model("Solution", SolutionSchema);
export const Application = mongoose.models.Application || mongoose.model("Application", ApplicationSchema);
export const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema);
export const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
// --- Database Seeding logic ---
export async function seedDatabase() {
    try {
        const counts = {
            products: await Product.countDocuments(),
            solutions: await Solution.countDocuments(),
            applications: await Application.countDocuments(),
            services: await Service.countDocuments(),
            admins: await Admin.countDocuments(),
        };
        const needsSeeding = counts.products === 0 ||
            counts.solutions === 0 ||
            counts.applications === 0 ||
            counts.services === 0 ||
            counts.admins === 0;
        if (!needsSeeding) {
            console.log(`Database verification passed. MongoDB collections loaded.
        - ${counts.products} Products
        - ${counts.solutions} Solutions
        - ${counts.applications} Applications
        - ${counts.services} Services
        - ${counts.admins} Admins`);
            return;
        }
        console.log("One or more MongoDB collections are empty. Scanning local database.json file...");
        if (!fs.existsSync(DB_FILE)) {
            console.warn(`Local seed file database.json not found at ${DB_FILE}. Skipping seeding.`);
            return;
        }
        const rawData = fs.readFileSync(DB_FILE, "utf-8");
        const seed = JSON.parse(rawData);
        if (counts.products === 0 && seed.products && seed.products.length > 0) {
            console.log(`Seeding ${seed.products.length} Products to MongoDB...`);
            await Product.insertMany(seed.products);
        }
        if (counts.solutions === 0 && seed.solutions && seed.solutions.length > 0) {
            console.log(`Seeding ${seed.solutions.length} Solutions to MongoDB...`);
            await Solution.insertMany(seed.solutions);
        }
        if (counts.applications === 0 && seed.applications && seed.applications.length > 0) {
            console.log(`Seeding ${seed.applications.length} Applications to MongoDB...`);
            await Application.insertMany(seed.applications);
        }
        if (counts.services === 0 && seed.services && seed.services.length > 0) {
            console.log(`Seeding ${seed.services.length} Services to MongoDB...`);
            await Service.insertMany(seed.services);
        }
        if (counts.admins === 0 && seed.admin && seed.admin.length > 0) {
            console.log(`Seeding ${seed.admin.length} Administrators to MongoDB...`);
            await Admin.insertMany(seed.admin);
        }
        console.log("MongoDB collections seeded successfully from database.json!");
    }
    catch (error) {
        console.error("Failed to seed MongoDB database:", error);
    }
}

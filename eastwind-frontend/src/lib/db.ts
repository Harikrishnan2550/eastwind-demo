import fs from "fs";
import path from "path";
import { productsDb, ProductItem } from "@/data/productsData";
import { solutionsDb, validDynamicSlugs, getDynamicProductData } from "@/app/solutions/[id]/page";
import { applicationsDb } from "@/app/applications/[id]/page";
import { servicesDb } from "@/app/services/[id]/page";

const DB_FILE = path.join(process.cwd(), "database.json");

interface DbSchema {
  products: ProductItem[];
  solutions: any[];
  applications: any[];
  services: any[];
}

function initializeDb(): DbSchema {
  console.log("Database file not found. Seeding initial data...");

  // Seed Products
  const products = [...productsDb];

  // Seed Solutions
  const solutions: any[] = [];
  // 1. Seed static solutions
  for (const [key, val] of Object.entries(solutionsDb)) {
    solutions.push({
      id: key,
      ...val,
    });
  }
  // 2. Seed dynamic solution slugs so they are all in the DB and can be edited
  for (const slug of validDynamicSlugs) {
    if (!solutions.find((s) => s.id === slug)) {
      const data = getDynamicProductData(slug);
      if (data) {
        solutions.push({
          id: slug,
          ...data,
        });
      }
    }
  }

  // Seed Applications
  const applications: any[] = [];
  for (const [key, val] of Object.entries(applicationsDb)) {
    applications.push({
      id: key,
      ...val,
    });
  }

  // Seed Services
  const services: any[] = [];
  for (const [key, val] of Object.entries(servicesDb)) {
    services.push({
      id: key,
      ...val,
    });
  }

  const initialData: DbSchema = {
    products,
    solutions,
    applications,
    services,
  };

  fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), "utf8");
  return initialData;
}

export function getDb(): DbSchema {
  if (!fs.existsSync(DB_FILE)) {
    return initializeDb();
  }
  try {
    const raw = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(raw) as DbSchema;
  } catch (err) {
    console.error("Error reading database file. Initializing defaults.", err);
    return initializeDb();
  }
}

export function saveDb(data: DbSchema) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
}

// --- CRUD Operations ---
export const db = {
  products: {
    getAll: () => getDb().products,
    getById: (id: string) => getDb().products.find((p) => p.id === id),
    create: (item: ProductItem) => {
      const data = getDb();
      if (data.products.some((p) => p.id === item.id)) {
        throw new Error(`Product with ID ${item.id} already exists`);
      }
      data.products.push(item);
      saveDb(data);
      return item;
    },
    update: (id: string, updates: Partial<ProductItem>) => {
      const data = getDb();
      const idx = data.products.findIndex((p) => p.id === id);
      if (idx === -1) throw new Error(`Product with ID ${id} not found`);
      data.products[idx] = { ...data.products[idx], ...updates, id }; // retain ID
      saveDb(data);
      return data.products[idx];
    },
    delete: (id: string) => {
      const data = getDb();
      const idx = data.products.findIndex((p) => p.id === id);
      if (idx === -1) throw new Error(`Product with ID ${id} not found`);
      const removed = data.products.splice(idx, 1)[0];
      saveDb(data);
      return removed;
    },
  },

  solutions: {
    getAll: () => getDb().solutions,
    getById: (id: string) => getDb().solutions.find((s) => s.id === id),
    create: (item: any) => {
      const data = getDb();
      if (data.solutions.some((s) => s.id === item.id)) {
        throw new Error(`Solution with ID ${item.id} already exists`);
      }
      data.solutions.push(item);
      saveDb(data);
      return item;
    },
    update: (id: string, updates: any) => {
      const data = getDb();
      const idx = data.solutions.findIndex((s) => s.id === id);
      if (idx === -1) throw new Error(`Solution with ID ${id} not found`);
      data.solutions[idx] = { ...data.solutions[idx], ...updates, id };
      saveDb(data);
      return data.solutions[idx];
    },
    delete: (id: string) => {
      const data = getDb();
      const idx = data.solutions.findIndex((s) => s.id === id);
      if (idx === -1) throw new Error(`Solution with ID ${id} not found`);
      const removed = data.solutions.splice(idx, 1)[0];
      saveDb(data);
      return removed;
    },
  },

  applications: {
    getAll: () => getDb().applications,
    getById: (id: string) => getDb().applications.find((a) => a.id === id),
    create: (item: any) => {
      const data = getDb();
      if (data.applications.some((a) => a.id === item.id)) {
        throw new Error(`Application with ID ${item.id} already exists`);
      }
      data.applications.push(item);
      saveDb(data);
      return item;
    },
    update: (id: string, updates: any) => {
      const data = getDb();
      const idx = data.applications.findIndex((a) => a.id === id);
      if (idx === -1) throw new Error(`Application with ID ${id} not found`);
      data.applications[idx] = { ...data.applications[idx], ...updates, id };
      saveDb(data);
      return data.applications[idx];
    },
    delete: (id: string) => {
      const data = getDb();
      const idx = data.applications.findIndex((a) => a.id === id);
      if (idx === -1) throw new Error(`Application with ID ${id} not found`);
      const removed = data.applications.splice(idx, 1)[0];
      saveDb(data);
      return removed;
    },
  },

  services: {
    getAll: () => getDb().services,
    getById: (id: string) => getDb().services.find((s) => s.id === id),
    create: (item: any) => {
      const data = getDb();
      if (data.services.some((s) => s.id === item.id)) {
        throw new Error(`Service with ID ${item.id} already exists`);
      }
      data.services.push(item);
      saveDb(data);
      return item;
    },
    update: (id: string, updates: any) => {
      const data = getDb();
      const idx = data.services.findIndex((s) => s.id === id);
      if (idx === -1) throw new Error(`Service with ID ${id} not found`);
      data.services[idx] = { ...data.services[idx], ...updates, id };
      saveDb(data);
      return data.services[idx];
    },
    delete: (id: string) => {
      const data = getDb();
      const idx = data.services.findIndex((s) => s.id === id);
      if (idx === -1) throw new Error(`Service with ID ${id} not found`);
      const removed = data.services.splice(idx, 1)[0];
      saveDb(data);
      return removed;
    },
  },
};

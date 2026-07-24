import { Brand, IBrand } from "../db.js";
import { DB_FILE } from "../config.js";
import fs from "fs";

export class BrandModel {
  static async getAll(): Promise<IBrand[]> {
    let items = await Brand.find({}).exec();

    // Auto-sync missing brands from database.json if fewer than 11 brands in MongoDB
    if (!items || items.length < 11) {
      if (fs.existsSync(DB_FILE)) {
        try {
          const rawData = fs.readFileSync(DB_FILE, "utf-8");
          const seed = JSON.parse(rawData);
          if (seed.brands && seed.brands.length > 0) {
            for (const b of seed.brands) {
              await Brand.findOneAndUpdate({ id: b.id }, b, { upsert: true, new: true });
            }
            items = await Brand.find({}).exec();
          }
        } catch (e) {
          console.error("Auto-syncing brands failed:", e);
        }
      }
    }

    return items;
  }

  static async getById(id: string): Promise<IBrand | null> {
    return await Brand.findOne({ id }).exec();
  }

  static async create(data: Partial<IBrand>): Promise<IBrand> {
    return await Brand.create(data);
  }

  static async update(id: string, updates: Partial<IBrand>): Promise<IBrand | null> {
    return await Brand.findOneAndUpdate({ id }, updates, { new: true }).exec();
  }

  static async delete(id: string): Promise<IBrand | null> {
    return await Brand.findOneAndDelete({ id }).exec();
  }
}

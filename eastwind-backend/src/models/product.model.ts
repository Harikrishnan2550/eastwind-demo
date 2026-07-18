import { Product, IProduct } from "../db.js";

export class ProductModel {
  static async getAll(): Promise<IProduct[]> {
    return await Product.find({}).exec();
  }

  static async getById(id: string): Promise<IProduct | null> {
    return await Product.findOne({ id }).exec();
  }

  static async create(data: Partial<IProduct>): Promise<IProduct> {
    return await Product.create(data);
  }

  static async update(id: string, updates: Partial<IProduct>): Promise<IProduct | null> {
    return await Product.findOneAndUpdate({ id }, updates, { new: true }).exec();
  }

  static async delete(id: string): Promise<IProduct | null> {
    return await Product.findOneAndDelete({ id }).exec();
  }
}

import { Product } from "../db.js";
export class ProductModel {
    static async getAll() {
        return await Product.find({}).exec();
    }
    static async getById(id) {
        return await Product.findOne({ id }).exec();
    }
    static async create(data) {
        return await Product.create(data);
    }
    static async update(id, updates) {
        return await Product.findOneAndUpdate({ id }, updates, { new: true }).exec();
    }
    static async delete(id) {
        return await Product.findOneAndDelete({ id }).exec();
    }
}

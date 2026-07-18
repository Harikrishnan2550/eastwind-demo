import { Service } from "../db.js";
export class ServiceModel {
    static async getAll() {
        return await Service.find({}).exec();
    }
    static async getById(id) {
        return await Service.findOne({ id }).exec();
    }
    static async create(data) {
        return await Service.create(data);
    }
    static async update(id, updates) {
        return await Service.findOneAndUpdate({ id }, updates, { new: true }).exec();
    }
    static async delete(id) {
        return await Service.findOneAndDelete({ id }).exec();
    }
}

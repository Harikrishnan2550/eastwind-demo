import { Application } from "../db.js";
export class ApplicationModel {
    static async getAll() {
        return await Application.find({}).exec();
    }
    static async getById(id) {
        return await Application.findOne({ id }).exec();
    }
    static async create(data) {
        return await Application.create(data);
    }
    static async update(id, updates) {
        return await Application.findOneAndUpdate({ id }, updates, { new: true }).exec();
    }
    static async delete(id) {
        return await Application.findOneAndDelete({ id }).exec();
    }
}

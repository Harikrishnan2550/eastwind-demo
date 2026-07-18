import { Solution } from "../db.js";
export class SolutionModel {
    static async getAll() {
        return await Solution.find({}).exec();
    }
    static async getById(id) {
        return await Solution.findOne({ id }).exec();
    }
    static async create(data) {
        return await Solution.create(data);
    }
    static async update(id, updates) {
        return await Solution.findOneAndUpdate({ id }, updates, { new: true }).exec();
    }
    static async delete(id) {
        return await Solution.findOneAndDelete({ id }).exec();
    }
}

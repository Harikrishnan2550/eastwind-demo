import { AboutContent } from "../db.js";
export class AboutModel {
    static async getAll() {
        return await AboutContent.find({}).exec();
    }
    static async getBySection(id) {
        return await AboutContent.findOne({ id }).exec();
    }
    static async upsertSection(id, data) {
        return await AboutContent.findOneAndUpdate({ id }, { ...data, id }, { new: true, upsert: true }).exec();
    }
}

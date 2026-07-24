import { ContactSettings } from "../db.js";
export class ContactSettingsModel {
    static async getAll() {
        return await ContactSettings.find({}).exec();
    }
    static async getBySection(id) {
        return await ContactSettings.findOne({ id }).exec();
    }
    static async upsertSection(id, data) {
        return await ContactSettings.findOneAndUpdate({ id }, { ...data, id }, { new: true, upsert: true }).exec();
    }
}

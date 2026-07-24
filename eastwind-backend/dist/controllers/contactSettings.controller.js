import { ContactSettingsModel } from "../models/contact.model.js";
export class ContactSettingsController {
    static async getAll(req, res, next) {
        try {
            const items = await ContactSettingsModel.getAll();
            res.json(items);
        }
        catch (error) {
            next(error);
        }
    }
    static async getBySection(req, res, next) {
        try {
            const { section } = req.params;
            const item = await ContactSettingsModel.getBySection(section);
            if (!item) {
                res.status(404).json({ error: `Contact settings section '${section}' not found` });
                return;
            }
            res.json(item);
        }
        catch (error) {
            next(error);
        }
    }
    static async updateSection(req, res, next) {
        try {
            const { section } = req.params;
            const updated = await ContactSettingsModel.upsertSection(section, req.body);
            res.json(updated);
        }
        catch (error) {
            next(error);
        }
    }
}

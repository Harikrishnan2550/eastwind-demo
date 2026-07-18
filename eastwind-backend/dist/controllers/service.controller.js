import { ServiceModel } from "../models/service.model.js";
export class ServiceController {
    static async getAll(req, res, next) {
        try {
            const items = await ServiceModel.getAll();
            res.json(items);
        }
        catch (error) {
            next(error);
        }
    }
    static async getById(req, res, next) {
        try {
            const item = await ServiceModel.getById(req.params.id);
            if (!item) {
                res.status(404).json({ error: "Service not found" });
                return;
            }
            res.json(item);
        }
        catch (error) {
            next(error);
        }
    }
    static async create(req, res, next) {
        try {
            const created = await ServiceModel.create(req.body);
            res.status(201).json(created);
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const updated = await ServiceModel.update(req.params.id, req.body);
            if (!updated) {
                res.status(404).json({ error: "Service not found to update" });
                return;
            }
            res.json(updated);
        }
        catch (error) {
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const deleted = await ServiceModel.delete(req.params.id);
            if (!deleted) {
                res.status(404).json({ error: "Service not found to delete" });
                return;
            }
            res.json(deleted);
        }
        catch (error) {
            next(error);
        }
    }
}

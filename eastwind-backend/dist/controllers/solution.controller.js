import { SolutionModel } from "../models/solution.model.js";
export class SolutionController {
    static async getAll(req, res, next) {
        try {
            const items = await SolutionModel.getAll();
            res.json(items);
        }
        catch (error) {
            next(error);
        }
    }
    static async getById(req, res, next) {
        try {
            const item = await SolutionModel.getById(req.params.id);
            if (!item) {
                res.status(404).json({ error: "Solution not found" });
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
            const created = await SolutionModel.create(req.body);
            res.status(201).json(created);
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const updated = await SolutionModel.update(req.params.id, req.body);
            if (!updated) {
                res.status(404).json({ error: "Solution not found to update" });
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
            const deleted = await SolutionModel.delete(req.params.id);
            if (!deleted) {
                res.status(404).json({ error: "Solution not found to delete" });
                return;
            }
            res.json(deleted);
        }
        catch (error) {
            next(error);
        }
    }
}

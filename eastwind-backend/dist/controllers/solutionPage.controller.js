import { SolutionPageModel } from "../models/solutionPage.model.js";
export class SolutionPageController {
    static async get(req, res, next) {
        try {
            const page = await SolutionPageModel.get();
            if (!page) {
                res.status(404).json({ error: "Solutions page content not found" });
                return;
            }
            res.json(page);
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const updated = await SolutionPageModel.update(req.body);
            res.json(updated);
        }
        catch (error) {
            next(error);
        }
    }
}

import { SolutionPage } from "../db.js";
export class SolutionPageModel {
    static async get() {
        return await SolutionPage.findOne({ id: "solutions_page" }).exec();
    }
    static async update(data) {
        return await SolutionPage.findOneAndUpdate({ id: "solutions_page" }, { ...data, id: "solutions_page" }, { new: true, upsert: true }).exec();
    }
}

import { SolutionPage, ISolutionPage } from "../db.js";

export class SolutionPageModel {
  static async get(): Promise<ISolutionPage | null> {
    return await SolutionPage.findOne({ id: "solutions_page" }).exec();
  }

  static async update(data: Partial<ISolutionPage>): Promise<ISolutionPage> {
    return await SolutionPage.findOneAndUpdate(
      { id: "solutions_page" },
      { ...data, id: "solutions_page" },
      { new: true, upsert: true }
    ).exec();
  }
}

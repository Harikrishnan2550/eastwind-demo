import { AboutContent, IAboutContent } from "../db.js";

export class AboutModel {
  static async getAll(): Promise<IAboutContent[]> {
    return await AboutContent.find({}).exec();
  }

  static async getBySection(id: string): Promise<IAboutContent | null> {
    return await AboutContent.findOne({ id }).exec();
  }

  static async upsertSection(id: string, data: Partial<IAboutContent>): Promise<IAboutContent> {
    return await AboutContent.findOneAndUpdate(
      { id },
      { ...data, id },
      { new: true, upsert: true }
    ).exec();
  }
}

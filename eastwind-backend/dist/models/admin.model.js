import { Admin } from "../db.js";
export class AdminModel {
    static async getByUsername(username) {
        return await Admin.findOne({ username }).exec();
    }
    static async updatePassword(username, passwordHash, salt) {
        return await Admin.findOneAndUpdate({ username }, { passwordHash, salt }, { new: true }).exec();
    }
}

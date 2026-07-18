import jwt from "jsonwebtoken";
import { AdminModel } from "../models/admin.model.js";
import { verifyPassword, hashPassword, generateSalt } from "../utils/hash.js";
import { JWT_SECRET } from "../config.js";
export class AuthController {
    /**
     * Admin Login endpoint. Validates username and password and signs JWT.
     */
    static async login(req, res, next) {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                res.status(400).json({ error: "Username and password are required" });
                return;
            }
            const admin = await AdminModel.getByUsername(username);
            if (!admin) {
                res.status(401).json({ error: "Invalid credentials" });
                return;
            }
            const isPasswordValid = verifyPassword(password, admin.passwordHash, admin.salt);
            if (!isPasswordValid) {
                res.status(401).json({ error: "Invalid credentials" });
                return;
            }
            // Generate secure JWT token (valid for 8 hours)
            const token = jwt.sign({ username: admin.username }, JWT_SECRET, { expiresIn: "8h" });
            console.log(`Admin '${username}' logged in successfully.`);
            res.json({ token, username: admin.username });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Admin password change endpoint. Securely updates password inside db.
     */
    static async changePassword(req, res, next) {
        try {
            const { currentPassword, newPassword } = req.body;
            if (!currentPassword || !newPassword) {
                res.status(400).json({ error: "Current password and new password are required" });
                return;
            }
            // Read admin context injected by Auth Middleware
            const username = req.admin?.username;
            if (!username) {
                res.status(401).json({ error: "Unauthorized auth context" });
                return;
            }
            const admin = await AdminModel.getByUsername(username);
            if (!admin) {
                res.status(404).json({ error: "Admin user not found" });
                return;
            }
            // Verify current password is correct
            const isCurrentValid = verifyPassword(currentPassword, admin.passwordHash, admin.salt);
            if (!isCurrentValid) {
                res.status(400).json({ error: "Incorrect current password" });
                return;
            }
            // Generate new salt and hash for the new password
            const newSalt = generateSalt();
            const newHash = hashPassword(newPassword, newSalt);
            // Save to database
            await AdminModel.updatePassword(username, newHash, newSalt);
            console.log(`Admin '${username}' changed password successfully.`);
            res.json({ message: "Password updated successfully" });
        }
        catch (error) {
            next(error);
        }
    }
}

import { Router } from "express";
import multer from "multer";
import fs from "fs";
import { UPLOAD_DIR } from "../config.js";
import { UploadController } from "../controllers/upload.controller.js";
import { requireAdmin } from "../middlewares/auth.middleware.js";
const router = Router();
// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}
// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const cleanName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_");
        cb(null, `${timestamp}-${cleanName}`);
    }
});
const upload = multer({ storage });
router.post("/", requireAdmin, upload.single("file"), UploadController.handleUpload);
export default router;

import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { requireAdmin } from "../middlewares/auth.middleware.js";
const router = Router();
// POST login - Public
router.post("/login", AuthController.login);
// POST change password - Protected
router.post("/change-password", requireAdmin, AuthController.changePassword);
export default router;

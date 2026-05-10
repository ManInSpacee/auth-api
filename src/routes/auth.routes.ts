import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const controller = new AuthController();
const authRouter = Router();

authRouter.post("/register", controller.register);
authRouter.post("/login", controller.login);
authRouter.post("/logout", controller.logout);
authRouter.post("/refresh", controller.refresh);
authRouter.get("/me", authMiddleware, controller.me);

export default authRouter;

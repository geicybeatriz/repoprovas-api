import { Router } from "express";
import { signUp } from "../controllers/authController.js";
import validateSchemas from "../middlewares/schemaValidationMiddleware.js";
import authSchemas from "../schemas/authSchemas.js";

const authRouter = Router();

authRouter.post("/signup", validateSchemas(authSchemas.signUpSchema), signUp);

export default authRouter;
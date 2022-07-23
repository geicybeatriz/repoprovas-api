import { Router } from "express";
import userController from "../controllers/authController.js";
import validateSchemas from "../middlewares/schemaValidationMiddleware.js";
import authSchemas from "../schemas/authSchemas.js";

const authRouter = Router();

authRouter.post("/signup", validateSchemas(authSchemas.signUpSchema), userController.signUp);
authRouter.post("/signin", validateSchemas(authSchemas.signInSchema), userController.signIn);

export default authRouter;
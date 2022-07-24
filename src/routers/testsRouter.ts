import { Router } from "express";
import testsController from "../controllers/testsController.js";
import validateSchemas from "../middlewares/schemaValidationMiddleware.js";
import tokenValidation from "../middlewares/tokenValidationMiddleware.js";
import testSchema from "../schemas/testSchema.js";

const testRouter = Router();

testRouter.post("/tests", tokenValidation, validateSchemas(testSchema), testsController.addTests);
testRouter.get("/tests", tokenValidation, testsController.getTests);

export default testRouter;


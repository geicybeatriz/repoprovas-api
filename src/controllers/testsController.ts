import { Request, Response  } from "express";
import testService from "../services/testsServices.js";

async function addTests(req:Request, res:Response){
    const {userId} = res.locals.userId;
    await testService.createTest(req.body, userId);
    res.sendStatus(200);
}

const testsController = {
    addTests
}

export default testsController;
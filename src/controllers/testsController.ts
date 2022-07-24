import { Request, Response  } from "express";
import testService from "../services/testsServices.js";

async function addTests(req:Request, res:Response){
    const {userId} = res.locals.userId;
    await testService.createTest(req.body, userId);
    res.sendStatus(201);
}

async function getTests(req:Request, res:Response){
    const groupBy:any = req.query.groupBy;
    const {userId} = res.locals.userId;

    const allTests = await testService.getAllTests(userId, groupBy);
    res.status(200).send(allTests);
}

const testsController = {
    addTests,
    getTests
}

export default testsController;
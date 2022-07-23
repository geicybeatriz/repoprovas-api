import { Request, Response } from "express";
import authServices from "../services/authServices.js";

async function signUp(req:Request, res:Response){
    await authServices.insertUserData({email:req.body.email, password:req.body.password});
    res.sendStatus(201);
}

async function signIn(req:Request, res:Response){
    const userToken = await authServices.login(req.body);
    res.status(200).send(userToken)
}

const userController = {
    signIn, signUp
}

export default userController;
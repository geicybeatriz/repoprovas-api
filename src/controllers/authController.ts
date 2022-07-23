import { Request, Response } from "express";
import authServices from "../services/authServices.js";

export async function signUp(req:Request, res:Response){
    await authServices.insertUserData({email:req.body.email, password:req.body.password});
    res.sendStatus(201);
}
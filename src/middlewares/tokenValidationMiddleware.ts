import { Request, Response, NextFunction } from "express";
import authUtils from "../utils/authUtils.js";

export default async function tokenValidation(req:Request, res:Response, next:NextFunction){
    const {authorization} = req.headers;
    if(!authorization) throw {type:"unauthorized", message:"access denied"};

    const token = authorization?.replace('Bearer ', '');
    if(!token) throw {type:"unauthorized", message:"unauthorized token"};

    const checkToken = await authUtils.verifyToken(token);
    res.locals.userId = checkToken;

    next();
}
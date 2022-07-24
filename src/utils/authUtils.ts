import jwt from "jsonwebtoken";
import repoUsers from "../repositories/userRepository.js";
import dotenv from "dotenv";
dotenv.config();

async function verifyToken(token:string){
    const secretKey = process.env.JWT_SECRET;
    const verify = jwt.verify(token, secretKey);
    return verify;
}

async function verifyUser(id:number){
    const user = await repoUsers.findById(id);
    if(!user) throw {type:"not found", message:"user not found"};
    return user;
}

const authUtils = {
    verifyToken,
    verifyUser
}

export default authUtils;
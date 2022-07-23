import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function verifyToken(token:string){
    const secretKey = process.env.JWT_SECRET;
    const verify = jwt.verify(token, secretKey);
    return verify;
}
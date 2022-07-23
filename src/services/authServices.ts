import { User } from "@prisma/client";
import repoUsers from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export type CreateUserData = Omit<User, "id">;

async function encryptPassword(password:string){
    const salt = await bcrypt.genSalt(10);
    const encrypted = bcrypt.hashSync(password, salt);
    return encrypted;
}

async function matchEncriptedPassword(encriptedPassword:string, password:string){
    const checkData = await bcrypt.compare(password, encriptedPassword);
    if(!checkData) throw {type:"unauthorized", message:"incorrect password"};
    return checkData;
}

async function insertUserData(data:CreateUserData){
    const userExists = await repoUsers.findUserByEmail(data.email);
    if(userExists) throw {type: "conflict", message:"this email already exists!"};

    const hashPassword = await encryptPassword(data.password);
    await repoUsers.createUser({email:data.email, password:hashPassword});
    return;
}

function generateToken(userId:number){
    const data = { userId };
    const config = {expiresIn:60*60*24*30};
    const secretKey = process.env.JWT_SECRET;

    const token = jwt.sign(data, secretKey, config);
    return token;
}

async function login(data:CreateUserData){
    const userExists = await repoUsers.findUserByEmail(data.email);
    if(!userExists) throw {type: "not found", message:"incorrect email or password"};

    await matchEncriptedPassword(userExists.password, data.password);

    const token = generateToken(userExists.id);
    return token;
}

const authServices = {
    insertUserData,
    login
}
export default authServices;
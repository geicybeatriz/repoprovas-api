import { User } from "@prisma/client";
import repoUsers from "../repositories/userRepository.js";
import bcrypt from "bcrypt";

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

async function verifyUserByEmail(email:string){
    const userExists = await repoUsers.findUserByEmail(email);
    if(userExists) throw {type: "conflict", message:"this email already exists!"}
    return;
}

async function insertUserData(data:CreateUserData){
    await verifyUserByEmail(data.email);
    const hashPassword = await encryptPassword(data.password);
    await repoUsers.createUser({email:data.email, password:hashPassword});
    return;
}

const authServices = {
    verifyUserByEmail,
    insertUserData
}
export default authServices;
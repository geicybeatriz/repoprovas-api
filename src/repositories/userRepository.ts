import prisma from "../config/database.js";
import { CreateUserData } from "../services/authServices.js";

async function findUserByEmail(email:string){
    return await prisma.user.findFirst({
        where: {email:email}
    });
}

async function findById(id:number){
    return await prisma.user.findFirst({
        where: {id:id}
    });
}

async function createUser(data: CreateUserData) {
    await prisma.user.create({
        data: {
            email:data.email, 
            password:data.password
        }
    });
    
}

const repoUsers = {
    findUserByEmail,
    findById,
    createUser
}

export default repoUsers;